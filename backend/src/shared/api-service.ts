import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable()
export class ApiService {
  private readonly apiUrl = 'http://api:3000/graphql'; // URL of the main GraphQL API

  constructor(private httpService: HttpService) {}

  query<T>(query: string, variables?: any): Observable<T> {
    const payload = {
      query,
      variables,
    };
    console.log('Sending GraphQL query:', JSON.stringify(payload, null, 2));
    console.log('API URL:', this.apiUrl);

    return this.httpService
      .post<{ data: T }>(this.apiUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        map((response) => {
          console.log(
            'Received response:',
            JSON.stringify(response.data, null, 2),
          );
          return response.data.data;
        }),
        catchError((error) => {
          console.error('Error querying API:', error.message);
          if (error.response) {
            console.error(
              'Error response data:',
              JSON.stringify(error.response.data, null, 2),
            );
            console.error('Error response status:', error.response.status);
            console.error(
              'Error response headers:',
              JSON.stringify(error.response.headers, null, 2),
            );
          } else if (error.request) {
            console.error(
              'Error request:',
              JSON.stringify(error.request, null, 2),
            );
          } else {
            console.error('Error:', error.message);
          }
          console.error('Error config:', JSON.stringify(error.config, null, 2));
          return throwError(() => new Error('Failed to query API'));
        }),
      );
  }
}