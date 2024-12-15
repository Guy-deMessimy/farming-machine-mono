import { Injectable } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EngineTypes } from './engine-type.entity';
import { HttpService } from '@nestjs/axios/dist';

@Injectable()
export class EngineTypesService {
  constructor(private readonly httpService: HttpService) {}

  findAllEngineTypes({
    graphQlQuery,
  }: {
    graphQlQuery: string;
  }): Observable<EngineTypes[]> {
    const payload = { query: graphQlQuery};
    console.log('Payload sent to API:', JSON.stringify(payload, null, 2));

    return this.httpService
      .post<{ data: { findAllEngineTypes: EngineTypes[] } }>(
        process.env.API_URL || 'http://localhost:3000/graphql',
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .pipe(
        map((response) => response.data.data.findAllEngineTypes),
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
