import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../../../../modules/users/enums/role.enum';
import { ROLES_KEY } from '../../decorators/roles.decorator';
import { REQUEST_USER_KEY } from '../../../iam.constants';
import { ActiveUserData } from '../../../authentication/interfaces/active-user-data.interface';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contextRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!Array.isArray(contextRoles) || contextRoles.length === 0) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req as Request;
    const user: ActiveUserData = request[REQUEST_USER_KEY];
    return contextRoles.some((role) => user.role === role);
  }
}
