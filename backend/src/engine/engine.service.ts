import { Injectable } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Engine } from './engine.entity';
import { HttpService } from '@nestjs/axios/dist';

@Injectable()
export class EngineService {
  constructor(private readonly httpService: HttpService) {}

  getEngineList(requestBody: any): Observable<Engine[]> {
    const payload = {
      query: requestBody,
      // variables,
    };
    console.log('Extracted query in service:', payload.query);
    const response = this.httpService
      .post<{ data: { getEngines: Engine[] } }>(
        process.env.API_URL || 'http://localhost:3000/graphql',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .pipe(
        map((response) => {
          console.log('Received response from API:', response.data);
          // Retourner les données des engines
          return response.data.data.getEngines;
        }),
        catchError((error) => {
          console.error('Error during API call:', error.message);
          if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
          }
          return throwError(() => new Error('Failed to query API'));
        }),
      );
    console.log('RESPONSE', response);
    return response;
  }
}
