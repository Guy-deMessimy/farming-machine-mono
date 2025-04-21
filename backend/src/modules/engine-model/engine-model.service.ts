import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EngineModel } from './engine-model.entity';
import { GraphqlApiService } from '../graphql-api/graphql-api.service';
import { EngineModelQueryDto } from './engine-model-query.dto';
@Injectable()
export class EngineModelService {
  constructor(private readonly graphqlApiService: GraphqlApiService) {}

  findAllEngineModel({
    graphQlQuery,
    query,
  }: {
    graphQlQuery: string;
    query: EngineModelQueryDto;
  }): Observable<EngineModel[]> {
    // const payload = { query: graphQlQuery };
    // console.log('Payload sent to API:', JSON.stringify(payload, null, 2));
    const response = this.graphqlApiService.execute<EngineModel[]>(
      graphQlQuery,
      { query },
    );
    return response;
  }
}
