import { Resolver, Query, Context } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { EngineModelService } from './engine-model.service';
import { EngineModel } from './engine-model.entity';

@Resolver()
export class EngineModelResolver {
  private readonly logger = new Logger(EngineModelResolver.name);
  constructor(private readonly engineModelService: EngineModelService) {}

  @Query(() => [EngineModel], { nullable: true })
  findAllEngineModel(
    @Context() context?: { req: Request },
  ): Observable<EngineModel[]> {
    try {
      const graphQlQuery = context.req.body.query;
      if (typeof graphQlQuery !== 'string') {
        throw new Error('Request body query is not a string');
      }
      const result = this.engineModelService.findAllEngineModel({
        graphQlQuery,
      });
      return result;
    } catch (error) {
      this.logger.error('Resolver: findAllEngineModel error:', error.stack);
      throw error;
    }
  }
}
