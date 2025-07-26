import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { ApiKeysService } from '../../api-keys.service';
import { REQUEST_USER_KEY } from '../../../iam.constants';
import { ActiveUserData } from '../../interfaces/active-user-data.interface';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly logger = new Logger(ApiKeyGuard.name);
  constructor(private readonly apiKeysService: ApiKeysService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request: Request = ctx.getContext().req;
    const apiKey = this.extractKeyFromHeader(request);
    if (!apiKey) throw new UnauthorizedException('Missing API Key');

    const apiKeyId = this.apiKeysService.extractIdFromApiKey(apiKey);
    const apiKeyEntity = await this.apiKeysService.findByUuidOrThrow(apiKeyId);
    const isValid = await this.apiKeysService.validate(
      apiKey,
      apiKeyEntity.key,
    );

    if (!isValid) throw new UnauthorizedException('No validate API Key');

    request[REQUEST_USER_KEY] = {
      sub: apiKeyEntity.owner.id,
      email: apiKeyEntity.owner.email,
      role: apiKeyEntity.owner.role.name,
      permissions: apiKeyEntity.permissions.map((p) => p.name),
    } as unknown as ActiveUserData;
    return true;
  }

  private extractKeyFromHeader(request: Request): string | undefined {
    const [type, key] = request.headers.authorization?.split(' ') ?? [];
    return type === 'ApiKey' ? key : undefined;
  }
}
