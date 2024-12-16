import { Injectable } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Engine } from './engine.entity';
import { HttpService } from '@nestjs/axios/dist';
import { GraphqlApiService } from '../graphql-api/graphql-api.service';
// import { EngineQueryDto } from './engine-query.dto';

@Injectable()
export class EngineService {
  constructor(private readonly graphqlApiService: GraphqlApiService) {}

  findAllEngines({
    graphQlQuery,
    query,
  }: {
    graphQlQuery: string;
    query: any;
  }): Observable<Engine[]> {
    const payload = { query: graphQlQuery, variables: { query } };
    return this.graphqlApiService.execute<Engine[]>(graphQlQuery, query);
  }
}
