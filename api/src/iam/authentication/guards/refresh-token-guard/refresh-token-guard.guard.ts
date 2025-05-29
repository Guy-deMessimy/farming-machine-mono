import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';
// interfaces
import { RefreshTokenRequest } from '../../interfaces/refresh-token-request.interface';
import { RefreshTokenPayload } from '../../interfaces/refresh-token-payload.interface';
import jwtConfig from '../../../../iam/config/jwt.config';
import { REQUEST_USER_KEY } from '../../../iam.constants';

// Guard protège la mutation refreshToken (contre du flood, du token mal formé, etc.)
// Guard check que le header Authorization contient un JWT valide (Bearer <token>), décodable et vérifiable par JwtService et que le payload est attachable à request[REQUEST_USER_KEY]
@Injectable()
export class RefreshTokenGuard implements CanActivate {
  private readonly logger = new Logger(RefreshTokenGuard.name);
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req as RefreshTokenRequest;
    const refreshToken = this.extractTokenFromHeader(request);
    if (!refreshToken) {
      throw new UnauthorizedException('Missing access refresh token');
    }

    try {
      // Vérifie la validité du JWT
      const payload = await this.jwtService.verifyAsync<RefreshTokenPayload>(
        refreshToken,
        this.jwtConfiguration,
      );
      request.refreshToken = refreshToken;
      request.refreshTokenPayload = payload;
      request[REQUEST_USER_KEY] = payload;

      return true;
    } catch (err) {
      this.logger.error(`JWT verification failed:: ${err}`);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
