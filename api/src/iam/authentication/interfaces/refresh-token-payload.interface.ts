import { Role } from 'src/modules/users/enums/role.enum';
import { ActiveUserData } from './active-user-data.interface';

export interface RefreshTokenPayload extends ActiveUserData {
  sub: string; // nomalement dans activeuserdata donc pas besoin de redeclarer
  refreshTokenId: string;
  email: string; // nomalement dans activeuserdata donc pas besoin de redeclarer
  role: Role; // nomalement dans activeuserdata donc pas besoin de redeclarer
}
