import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Engine } from './engine.entity';
import { GraphqlApiService } from '../graphql-api/graphql-api.service';
import { EngineQueryDto } from './engine-query.dto';

@Injectable()
export class EngineService {
  constructor(private readonly graphqlApiService: GraphqlApiService) {}

  findAllEngines({
    graphQlQuery,
    query,
  }: {
    graphQlQuery: string;
    query: EngineQueryDto;
  }): Observable<Engine[]> {
    const response = this.graphqlApiService.execute<Engine[]>(graphQlQuery, {
      query,
    });
    return response;
  }
}
