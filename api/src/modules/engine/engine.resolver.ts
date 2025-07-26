import { Query, Resolver, Args } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { EngineService } from './engine.service';
import { Engine } from './engine.entity';
import { EngineQueryDto } from './engine-query.dto';
import { Auth } from '../../iam/authentication/decorators/auth.decorator';
import { AuthType } from '../../iam/authentication/enums/auth-type.enum';
import { Roles } from '../../iam/authorization/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

// @Auth(AuthType.Bearer) a activer pour auth
@Auth(AuthType.ApiKey)
@Resolver()
export class EngineResolver {
  private readonly logger = new Logger(EngineResolver.name);

  constructor(
    private readonly engineService: EngineService,
    private readonly pubSub: PubSub,
  ) {}

  // // @Roles(Role.VIEWER) role activer pour auth
  // @Auth(AuthType.None) // a desactiver pour auth
  @Query(() => [Engine], { name: 'findAllEngines', nullable: true })
  async findAllEngines(
    @Args('query', { nullable: true }) query?: EngineQueryDto,
  ) {
    return this.engineService.findAllEngines(query);
  }
}
