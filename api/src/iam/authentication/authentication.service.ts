import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  Inject,
  Logger,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
// services
import { HashingService } from '../hashing/hashing.service';
import { PrismaService } from 'src/prisma/prisma.service';
// interfaces
import { ActiveUserData } from './interfaces/active-user-data.interface';
// dto
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

import { UsersRepository } from '../../modules/users/users.repository';
import { User } from '../../modules/users/users.entity';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);
  constructor(
    private repository: UsersRepository,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly prisma: PrismaService,
  ) {}

  // register new user
  async signUp(signUpDto: SignUpDto): Promise<User> {
    try {
      const user = await this.repository.create({
        email: signUpDto.email,
        password: await this.hashingService.hash(signUpDto.password),
      });
      return user;
    } catch (err) {
      const pgUniqueViolationErrorCode = '23505';
      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException();
      }
      throw err;
    }
  }

  // verifying existed user credentials
  async signIn(signInDto: SignInDto) {
    const user = await this.repository.findOneBy({
      email: signInDto.email,
    });
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }
    const isEqual = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );
    if (!isEqual) {
      throw new UnauthorizedException('Password does not match', {
        cause: new Error(),
        description: 'Some error description',
      });
    }
    return await this.generateTokens(user);
  }

  async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email },
      ),
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl),
    ]);
    // hash and save refresh token in db
    const hashedRefreshToken = await this.hashingService.hash(refreshToken);

    await this.prisma.refreshToken.upsert({
      where: { userId: user.id },
      update: {
        tokenHash: hashedRefreshToken,
        expiresAt: new Date(
          Date.now() + this.jwtConfiguration.refreshTokenTtl * 1000,
        ),
      },
      create: {
        userId: user.id,
        tokenHash: hashedRefreshToken,
        expiresAt: new Date(
          Date.now() + this.jwtConfiguration.refreshTokenTtl * 1000,
        ),
      },
    });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  private async signToken<T>(userId: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }

  // let users have the ability to re-authenticate themselves : regenerate tokens using the refresh token
  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      // 1. Charge le token hashé de la base
      const tokenEntry = await this.prisma.refreshToken.findUnique({
        where: { userId: refreshTokenDto.sub },
      });
      console.log(
        '🚀 ~ AuthenticationService ~ refreshTokens ~ tokenEntry:',
        tokenEntry,
      );
      if (
        !tokenEntry ||
        !tokenEntry.tokenHash ||
        tokenEntry.revokedAt ||
        tokenEntry.expiresAt < new Date()
      ) {
        throw new UnauthorizedException('Refresh token invalide ou expiré', {
          cause: new Error(),
          description: 'Some error description',
        });
      }

      // 2. Compare le token reçu avec le hash
      const isEqual = await this.hashingService.compare(
        refreshTokenDto.refreshToken,
        tokenEntry.tokenHash,
      );
      console.log(
        '🚀 ~ AuthenticationService ~ refreshTokens ~ isEqual:',
        isEqual,
      );

      if (!isEqual) {
        this.logger.warn(
          `Tentative de refresh token invalide pour user ${refreshTokenDto.sub}`,
        );
        throw new UnauthorizedException('Refresh token invalide', {
          cause: new Error(),
          description: 'Some error description',
        });
      }

      const user = await this.repository.findOneBy({
        id: refreshTokenDto.sub,
      });
      // 4. Re-génère les tokens
      return this.generateTokens(user);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
