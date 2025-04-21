import { Resolver, Query, Context, Args } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { EngineTypesService } from './engine-type.service';
import { EngineTypes } from './engine-type.entity';
import { EngineTypesQueryDto } from './engine-type-query.dto';

@Resolver()
export class EngineTypesResolver {
  private readonly logger = new Logger(EngineTypesResolver.name);
  constructor(private readonly engineTypesService: EngineTypesService) {}

  @Query(() => [EngineTypes], { nullable: true })
  findAllEngineTypes(
    @Context() context?: { req: Request },
    @Args('query', { nullable: true }) query?: EngineTypesQueryDto,
  ): Observable<EngineTypes[]> {
    try {
      const graphQlQuery = context.req.body.query;
      if (typeof graphQlQuery !== 'string') {
        throw new Error('Request body query is not a string');
      }
      const result = this.engineTypesService.findAllEngineTypes({
        graphQlQuery,
        query,
      });
      return result;
    } catch (error) {
      this.logger.error('Resolver: findAllEngineTypes error:', error.stack);
      throw error;
    }
  }
}
