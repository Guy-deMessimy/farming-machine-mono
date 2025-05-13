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
    headers,
  }: {
    graphQlQuery: string;
    query: EngineQueryDto;
    headers?: string | string[] | undefined;
  }): Observable<Engine[]> {
    const cleanHeaders =
      typeof headers === 'string' ? { authorization: headers } : undefined;
    const response = this.graphqlApiService.execute<Engine[]>(
      graphQlQuery,
      {
        query,
      },
      cleanHeaders,
    );
    return response;
  }
}
