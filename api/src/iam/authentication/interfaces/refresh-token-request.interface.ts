import { Request } from 'express';
import { RefreshTokenPayload } from './refresh-token-payload.interface';

export interface RefreshTokenRequest extends Request {
  refreshToken: string;
  refreshTokenPayload: RefreshTokenPayload;
}
