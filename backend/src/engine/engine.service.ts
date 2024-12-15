import { Injectable } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Engine } from './engine.entity';
import { HttpService } from '@nestjs/axios/dist';
// import { EngineQueryDto } from './engine-query.dto';

@Injectable()
export class EngineService {
  constructor(private readonly httpService: HttpService) {}

  findAllEngines({
    graphQlQuery,
    query,
  }: {
    graphQlQuery: string;
    query: any;
  }): Observable<Engine[]> {
    const payload = { query: graphQlQuery, variables: { query } };
    console.log('Payload sent to API:', JSON.stringify(payload, null, 2));

    return this.httpService
      .post<{ data: { findAllEngines: Engine[] } }>(
        process.env.API_URL || 'http://localhost:3000/graphql',
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .pipe(
        map((response) => response.data.data.findAllEngines),
        catchError((error) => {
          console.error('Error during API call:', error.message);
          if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
          }
          throw new Error('Failed to query API');
        }),
      );
  }
}
