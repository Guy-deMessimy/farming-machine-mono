import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AUTH_TYPE_KEY } from '../../decorators/auth.decorator';
import { AuthType } from '../../enums/auth-type.enum';
import { AccessTokenGuard } from '../access-token/access-token.guard';

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
    };

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('authTypeGuardMap', this.authTypeGuardMap)
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
      }
    }
    // Si aucun guard ne valide, il lève l’erreur capturée (typiquement UnauthorizedException).
    throw error;
  }
}