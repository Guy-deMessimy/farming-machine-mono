import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IS_PUBLIC_KEY } from '../../../common/decorators/public.decorator';

@Injectable()
export class RefreshTokenHeaderInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // getAllAndOverride va chercher la metadata AUTH_TYPE_KEY (définie avec SetMetadata) sur la méthode (context.getHandler()) et sur la classe (context.getClass()).

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return next.handle();

    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    const token = request.cookies?.refreshToken;
    if (!token) {
      throw new UnauthorizedException('Missing access token in cookies');
    }
    request.headers['x-refresh-token'] = token;

    return next.handle();
  }
}
