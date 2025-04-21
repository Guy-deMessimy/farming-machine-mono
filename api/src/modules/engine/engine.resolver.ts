import { Query, Resolver, Args } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { EngineService } from './engine.service';
import { Engine } from './engine.entity';
import { EngineQueryDto } from './engine-query.dto';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
import { ActiveUserData } from 'src/iam/authentication/interfaces/active-user-data.interface';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';

@Resolver()
export class EngineResolver {
  private readonly logger = new Logger(EngineResolver.name);

  constructor(
    private readonly engineService: EngineService,
    private readonly pubSub: PubSub,
  ) {}

  @Query(() => [Engine], { name: 'findAllEngines', nullable: true })
  async findAllEngines(
    @Args('query', { nullable: true }) query?: EngineQueryDto,
    @ActiveUser() user?: ActiveUserData,
  ) {
    console.log('USER', user);
    this.logger.debug(`User ${user?.sub} called findAllEngines with query: ${JSON.stringify(query)}`);
    return this.engineService.findAllEngines(query);
  }
}
