import { registerEnumType } from '@nestjs/graphql';

export enum RatioEnum {
  SQUARE = 1, // 192 x 192
  MODERN = 9 / 16, // 1920 x 1080
  MODER_PORTRAIT = 16 / 9, // 1080 x 1920
  OLD = 3 / 4, // 1400 x 1050
  OLD_PORTRAIT = 4 / 3, // 1050 x 1400
  BANNER = 8 / 47, // 1128 x 192
  ULTRA_WIDE = 9 / 21, // 2560 x 1080
  SUPER_WIDE = 9 / 32, // 3840 x 1080
}

registerEnumType(RatioEnum, { name: 'ratioEnum' });
