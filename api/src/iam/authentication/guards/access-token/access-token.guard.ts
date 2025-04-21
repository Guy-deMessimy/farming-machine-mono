import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import jwtConfig from 'src/iam/config/jwt.config';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    // console.log('CTX', ctx)
    const request = ctx.getContext().req;
    // console.log('REQUEST', request)
    const token = this.extractTokenFromHeader(request);
    console.log('TOKKEN', token)
    if (!token) {
      throw new UnauthorizedException('Missing access token');
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      // const payload = await this.jwtService.verifyAsync(token, {
      //   secret: this.jwtConfiguration.secret,
      //   issuer: this.jwtConfiguration.issuer,
      //   audience: this.jwtConfiguration.audience,
      // });
      request[REQUEST_USER_KEY] = payload;
      console.log('PAYLOAD1', payload);
      return true;
    } catch (err) {
      console.error('JWT verification failed:', err);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // const [_, token] = request.headers.authorization?.split(' ') ?? [];
    // return token;
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
