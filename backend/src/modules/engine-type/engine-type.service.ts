import { Injectable } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EngineTypes } from './engine-type.entity';
import { HttpService } from '@nestjs/axios/dist';
import { GraphqlApiService } from '../graphql-api/graphql-api.service';

@Injectable()
export class EngineTypesService {
  constructor(private readonly graphqlApiService: GraphqlApiService) {}

  findAllEngineTypes({
    graphQlQuery,
  }: {
    graphQlQuery: string;
  }): Observable<EngineTypes[]> {
    const payload = { query: graphQlQuery };
    console.log('Payload sent to API:', JSON.stringify(payload, null, 2));
    return this.graphqlApiService.execute<EngineTypes[]>(graphQlQuery);
  }
}
