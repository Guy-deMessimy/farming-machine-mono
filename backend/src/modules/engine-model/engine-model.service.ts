import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EngineModel } from './engine-model.entity';
import { GraphqlApiService } from '../graphql-api/graphql-api.service';
@Injectable()
export class EngineModelService {
  constructor(private readonly graphqlApiService: GraphqlApiService) {}

  findAllEngineModel({
    graphQlQuery,
  }: {
    graphQlQuery: string;
  }): Observable<EngineModel[]> {
    const payload = { query: graphQlQuery };
    console.log('Payload sent to API:', JSON.stringify(payload, null, 2));
    const response =
      this.graphqlApiService.execute<EngineModel[]>(graphQlQuery);
    return response;
  }
}
