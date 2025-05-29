import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  Inject,
  Logger,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
// services
import { HashingService } from '../hashing/hashing.service';
import { PrismaService } from '../../prisma/prisma.service';
// interfaces
import { ActiveUserData } from './interfaces/active-user-data.interface';
// dto
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

import { UsersRepository } from '../../modules/users/users.repository';
import { User } from '../../modules/users/users.entity';
import jwtConfig from '../config/jwt.config';
import { RefreshTokenIdsStorage } from './refresh-token-ids.storage/refresh-token-ids.storage';
import { InvalidatedRefreshTokenError } from '../../common/errors/index';

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
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
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
    const refreshTokenId = randomUUID();
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email },
      ),
      this.signToken(
        user.id,
        this.jwtConfiguration.refreshTokenTtl,
        //Add an interface describing the refreshtoken structure
        {
          refreshTokenId,
        },
      ),
    ]);
    await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId);

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
      const user = await this.repository.findOneBy({
        id: refreshTokenDto.sub,
      });
      // compare les hash ? ou l'id ? cf this.hashingService.compare
      const isValid = await this.refreshTokenIdsStorage.validate(
        user.id,
        refreshTokenDto.refreshTokenId,
      );

      if (isValid) {
        // refresh token rotation technique
        await this.refreshTokenIdsStorage.invalidate(user.id);
      } else {
        throw new UnauthorizedException('Refresh token invalide', {
          cause: new Error(),
          description: 'Some error description',
        });
      }

      // 4. Re-génère les tokens
      return this.generateTokens(user);
    } catch (err) {
      if (err instanceof InvalidatedRefreshTokenError) {
        // Take action: notify user that his refresh token might have been stolen?
        throw new UnauthorizedException('Access denied');
      }
      throw new UnauthorizedException();
    }
  }
}
