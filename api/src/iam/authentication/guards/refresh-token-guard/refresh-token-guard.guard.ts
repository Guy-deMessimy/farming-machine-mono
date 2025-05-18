import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// interfaces
import { RefreshTokenRequest } from '../../interfaces/refresh-token-request.interface';
import { ActiveUserData } from '../../interfaces/active-user-data.interface';

// guard plus leger : Sert surtout à protéger la mutation refreshToken (contre du flood, du token mal formé, etc.)
// verifie la validité du jwt

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req as RefreshTokenRequest;

    const raw = request.headers['authorization'] as string;
    const token = Array.isArray(raw) ? raw[0] : raw;

    if (!token?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or malformed refresh token');
    }

    const refreshToken = token.replace('Bearer ', '');

    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token header');
    }

    try {
      // Vérifie la validité du JWT
      const payload = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refreshToken, {
        secret: this.configService.get<string>('jwt.secret'),
        audience: this.configService.get<string>('jwt.audience'),
        issuer: this.configService.get<string>('jwt.issuer'),
      });
      request.refreshToken = refreshToken;
      request.refreshTokenPayload = payload;

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
