import { Resolver, Query, Args, Info, Context } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { Observable } from 'rxjs';
import { EngineService } from './engine.service';
import { Engine } from './engine.entity';
// import { GraphQLJSONObject } from 'graphql-type-json';

@Resolver()
export class EngineResolver {
  constructor(private readonly engineService: EngineService) {}

  @Query(() => [Engine])
  getEngines(@Context() context: any): Observable<Engine[]> {
    try {
      const requestBody = context.req.body.query;
      console.log('requestBody in BACKEND resolver', requestBody);
      const result = this.engineService.getEngineList(requestBody);
      return result;
    } catch (error) {
      console.error('Resolver: getEngines error:', error);
      throw error;
    }
  }
}
