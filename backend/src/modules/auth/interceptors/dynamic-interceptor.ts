// src/common/interceptors/dynamic-interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { INTERCEPTOR_TYPE_KEY } from '../decorators/interceptor.decorator';
import { InterceptorType } from '../enums/interceptor-type.enum';
// interceptors
import { AuthHeaderInterceptor } from './auth-header.interceptor';
import { RefreshTokenHeaderInterceptor } from './refresh-token-interceptor';

// charger de mettre les cookies recus du navigateur dans les headers authorization

@Injectable()
export class DynamicInterceptor implements NestInterceptor {
  private readonly interceptorMap: Record<InterceptorType, NestInterceptor> = {
    [InterceptorType.Default]: this.defaultInterceptor,
    [InterceptorType.Refresh]: this.refreshInterceptor,
    [InterceptorType.None]: this.refreshInterceptor,
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly defaultInterceptor: AuthHeaderInterceptor,
    private readonly refreshInterceptor: RefreshTokenHeaderInterceptor,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const types = this.reflector.getAllAndOverride<InterceptorType[]>(
      INTERCEPTOR_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [InterceptorType.Default];

    if (types.includes(InterceptorType.None)) {
      return next.handle(); // ❌ aucun interceptor appliqué
    }

    // Tu pourrais même les enchaîner si plusieurs sont déclarés
    const interceptors = types.map((type) => this.interceptorMap[type]);

    // Pour l’instant on n’en supporte qu’un à la fois
    return interceptors[0].intercept(context, next);
  }
}
