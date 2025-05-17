import { SetMetadata } from '@nestjs/common';
import { InterceptorType } from '../enums/interceptor-type.enum';

export const INTERCEPTOR_TYPE_KEY = 'interceptorType';

export const UseDynamicInterceptor = (...types: InterceptorType[]) =>
  SetMetadata(INTERCEPTOR_TYPE_KEY, types);
