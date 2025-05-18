import { Request } from 'express';

export interface RefreshTokenRequest extends Request {
  refreshToken: string;
  refreshTokenPayload: {
    sub: string;
    [key: string]: any;
  };
}
