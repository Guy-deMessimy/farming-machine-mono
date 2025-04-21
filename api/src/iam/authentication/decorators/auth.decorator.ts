import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums/auth-type.enum';

export const AUTH_TYPE_KEY = 'authType';

// Permet d'annoter des resolvers ou des méthodes avec un ou plusieurs types d'auth.
// Stocké en metadata avec la clé authType.
// Ex: @Auth(AuthType.None) désactive l'auth pour ce resolver.

export const Auth = (...authTypes: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);
