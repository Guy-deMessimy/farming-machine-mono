import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EngineTypes } from './engine-type.entity';
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
    const response =
      this.graphqlApiService.execute<EngineTypes[]>(graphQlQuery);
    return response;
  }
}
