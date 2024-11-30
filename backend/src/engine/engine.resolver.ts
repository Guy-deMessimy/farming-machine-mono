import { Resolver, Query, Context, Args } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { EngineService } from './engine.service';
import { Engine } from './engine.entity';
import { EngineQueryDto } from './engine-query.dto';

@Resolver(() => Engine)
export class EngineResolver {
  private readonly logger = new Logger(EngineResolver.name);
  constructor(private readonly engineService: EngineService) {}

  // @Query(() => [Engine], { nullable: true })
  // getEngines(
  //   @Context() context?: { req: Request },
  //   @Args('query', { nullable: true }) query?: EngineQueryDto,
  // ): Observable<Engine[]> {
  //   try {
  //     const requestBody = context.req.body.query;
  //     if (typeof requestBody !== 'string') {
  //       throw new Error('Request body query is not a string');
  //     }

  //     console.log('requestBody (string)', requestBody);
  //     console.log('query (DTO)', query);
  //     // Combine the DTO and the original query
  //     // const combinedQuery = {
  //     //   ...query,
  //     //   originalQuery: requestBody,
  //     // };
  //     // console.log('combinedQuery', combinedQuery);
  //     // const payload = {
  //     //   query: requestBody, // La requête GraphQL au format string
  //     //   variables: { query: JSON.parse(JSON.stringify(query)) }, // Conv
  //     // };
  //     // console.log('payload (DTO)', payload);
  //     const result = this.engineService.getEngineList(requestBody);
  //     return result;
  //   } catch (error) {
  //     this.logger.error('Resolver: getEngines error:', error.stack);
  //     throw error;
  //   }
  // }

  @Query(() => [Engine], { nullable: true })
  getEngines(
    @Context() context?: { req: Request },
    @Args('query', { nullable: true }) query?: EngineQueryDto,
  ): Observable<Engine[]> {
    try {
      console.log('resolver backend query received)', query);
      console.log('resolver backend context received)', context);
      // console.log(
      //   'resolver backend Bbody variables received)',
      //   context.req.body.variables,
      // );

      // Appelle directement le service avec le query DTO
      return this.engineService.getEngineList(query);
    } catch (error) {
      this.logger.error('Resolver: getEngines error:', error.stack);
      throw error;
    }
  }
}
