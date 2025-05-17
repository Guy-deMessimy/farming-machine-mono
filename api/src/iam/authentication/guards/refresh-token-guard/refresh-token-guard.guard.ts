// src/auth/guards/refresh-token.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req as Request;

    const refreshToken = request.headers['x-refresh-token'] as string;

    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token header');
    }

    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('jwt.secret'),
        audience: this.configService.get<string>('jwt.audience'),
        issuer: this.configService.get<string>('jwt.issuer'),
      });
      console.log('🚀 ~ RefreshTokenGuard ~ canActivate ~ payload:', payload);

      // Injection du payload pour un usage ultérieur (ex: decorateur @CurrentUser)
      // request.user = payload;

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
