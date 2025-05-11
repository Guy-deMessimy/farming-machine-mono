import { Resolver, Query, Context, Args } from '@nestjs/graphql';
import { Logger, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { EngineService } from './engine.service';
import { Engine } from './engine.entity';
import { EngineQueryDto } from './engine-query.dto';

@Resolver(() => Engine)
export class EngineResolver {
  private readonly logger = new Logger(EngineResolver.name);
  constructor(private readonly engineService: EngineService) {}

  @Query(() => [Engine], { nullable: true })
  findAllEngines(
    @Context() context?: { req: Request },
    @Args('query', { nullable: true }) query?: EngineQueryDto,
  ): Observable<Engine[]> {
    try {
      const authHeader = context.req.headers['authorization'];
      // console.log('authHeader', authHeader);
      const graphQlQuery = context.req.body.query;
      if (typeof graphQlQuery !== 'string') {
        throw new Error('Request body query is not a string');
      }
      // if (!authHeader) {
      //   throw new UnauthorizedException('Missing access token');
      // }
      const result = this.engineService.findAllEngines({
        graphQlQuery,
        query,
        authHeader,
      });
      return result;
    } catch (error) {
      this.logger.error('Resolver: findAllEngines error:', error.stack);
      throw error;
    }
  }
}
