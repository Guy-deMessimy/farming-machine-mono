import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_TYPE_KEY } from '../../decorators/auth.decorator';
import { AuthType } from '../../enums/auth-type.enum';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { RefreshTokenGuard } from '../refresh-token-guard/refresh-token-guard.guard';

// C’est un composite guard dynamique :
// il lit les métadonnées posées avec @Auth(...)
// il choisit les guards à exécuter dynamiquement (Bearer, None, etc.)
// il délègue à AccessTokenGuard (ou d’autres si tu en ajoutes)
// C’est lui que tu appliques globalement via APP_GUARD dans main.ts ou AppModule.

// the can activate function should return a boolean, indicating whether the current request is allowed or not.
@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  // C’est une table de correspondance entre un AuthType et le guard (ou la stratégie) associée.
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
    [AuthType.Refresh]: this.refreshTokenGuard,
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
    private readonly refreshTokenGuard: RefreshTokenGuard,
  ) {}

  // les gardes ont accès à l'instance ExecutionContext et savent donc exactement ce qui va être exécuté ensuite.
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // le Reflector permet de lire les metadata posées avec des décorateurs custom (@Auth() ici).
    // getAllAndOverride va chercher la metadata AUTH_TYPE_KEY (définie avec SetMetadata) sur la méthode (context.getHandler()) et sur la classe (context.getClass()).
    // Si la méthode a une metadata, elle override celle de la classe. ((voir resolver))
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];
    //  Il choisit dynamiquement quels guards exécuter en fonction du @Auth(...).
    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();
    let error = new UnauthorizedException();

    for (const instance of guards) {
      // Il exécute chaque guard, en attrapant les erreurs, mais retourne true dès qu’un guard valide le contexte.
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((err) => {
        error = err;
      });

      if (canActivate) {
        return true;
        // if it returns true, the request will be processed.
        // if it returns false, Nest will deny the request.
      }
    }
    // Si aucun guard ne valide, il lève l’erreur capturée (typiquement UnauthorizedException).
    throw error;
  }
}
