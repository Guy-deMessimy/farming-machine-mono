import { Resolver, Query, Context, Args } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { EngineService } from './engine.service';
import { Engine } from './engine.entity';
import { EngineQueryDto } from './engine-query.dto';
import { UseDynamicInterceptor } from '../auth/decorators/interceptor.decorator';
import { InterceptorType } from '../auth/enums/interceptor-type.enum';

@Resolver(() => Engine)
export class EngineResolver {
  private readonly logger = new Logger(EngineResolver.name);
  constructor(private readonly engineService: EngineService) {}

  @Query(() => [Engine], { nullable: true })
  @UseDynamicInterceptor(InterceptorType.Default)
  findAllEngines(
    @Context() context?: { req: Request },
    @Args('query', { nullable: true }) query?: EngineQueryDto,
  ): Observable<Engine[]> {
    try {
      const graphQlQuery = context.req.body.query;
      const result = this.engineService.findAllEngines({
        graphQlQuery,
        query,
        headers: context.req.headers['authorization'],
      });
      return result;
    } catch (error) {
      this.logger.error('Resolver: findAllEngines error:', error.stack);
      throw error;
    }
  }
}
