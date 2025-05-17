// src/common/decorators/skip-interceptor.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { InterceptorType } from '../enums/interceptor-type.enum';
import { INTERCEPTOR_TYPE_KEY } from './interceptor.decorator';

export const SkipInterceptor = () =>
  SetMetadata(INTERCEPTOR_TYPE_KEY, [InterceptorType.None]);
