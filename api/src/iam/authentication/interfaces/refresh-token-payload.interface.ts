import { ActiveUserData } from './active-user-data.interface';

export interface RefreshTokenPayload extends ActiveUserData {
  sub: string;
  refreshTokenId: string;
  email: string;
}
