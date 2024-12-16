import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios/dist';
import { catchError, map, Observable } from 'rxjs';

@Injectable()
export class GraphqlApiService {
    constructor(private readonly httpService: HttpService) { }
      /**
   * Exécute une requête GraphQL avec des variables dynamiques.
   * @param query La requête GraphQL en string.
   * @param variables Les variables pour la requête (facultatif).
   * @returns Observable avec le type de données attendu.
   */

  execute<T>(query: string, variables: Record<string, any> = {}): Observable<T> {
    const payload = { query, variables };

    return this.httpService
      .post<{ data: T }>(
        process.env.API_URL || 'http://localhost:3000/graphql',
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .pipe(
        map((response) => {
          console.log('AAAA response', response.data.data);
          const data = response.data?.data
          if (!data) {
            throw new Error('No data found in GraphQL response');
          }
          const topLevelKey = Object.keys(data)[0];
          return data[topLevelKey];
        }),
        
        catchError((error) => {
          console.error('Error during API call:', error.message);
          if (error.response) {
            console.error('Error response:', error.response.data);
          }
          throw new HttpException(
            error.response?.data?.errors || 'Failed to execute GraphQL query',
            error.response?.status || 500,
          );
        }),
      );
  }
}
