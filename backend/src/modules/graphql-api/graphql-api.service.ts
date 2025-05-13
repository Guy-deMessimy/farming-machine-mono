import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios/dist';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class GraphqlApiService {
  constructor(private readonly httpService: HttpService) {}
  /**
   * Exécute une requête GraphQL avec des variables dynamiques.
   * @param graphQlQuery La requête GraphQL en string.
   * @param variables Les variables pour la requête (facultatif: query, input ...).
   * @returns Observable avec le type de données attendu.
   */

  execute<T>(
    graphQlQuery: string,
    variables: Record<string, any> = {},
    headers: Record<string, string> = {},
  ): Observable<T> {
    if (typeof graphQlQuery !== 'string') {
      throw new Error('Request body query is not a string');
    }

    const payload = { query: graphQlQuery, variables };
    return this.httpService
      .post<{ data?: Record<string, any>; errors?: any[] }>(
        process.env.API_URL || 'http://localhost:3000/graphql',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
        },
      )
      .pipe(
        map((response) => {
          const raw = response.data;
          // console.log('RAW:', raw);
          if (raw.errors?.length) {
            // console.log('RAW ERRORS:', raw.errors);
            throw {
              isGraphQLError: true,
              graphQLErrors: raw.errors,
            };
          }

          const data = raw.data;
          // console.log('DATA:', data);
          if (!data) {
            throw new Error('No data found in GraphQL response');
          }

          const topLevelKey = Object.keys(data)[0];
          return data[topLevelKey];
        }),

        catchError((error) => {
          if (error.isGraphQLError && error.graphQLErrors?.length) {
            const firstError = error.graphQLErrors[0];
            const message = firstError.message || 'GraphQL error';
            const statusCode =
              firstError.extensions?.exception?.status ??
              (firstError.extensions?.code === 'UNAUTHENTICATED' ? 401 : 400);

            return throwError(() => new HttpException(message, statusCode));
          }

          const fallbackErrors = error.response?.data?.errors;
          if (fallbackErrors?.length) {
            const message = fallbackErrors[0].message || 'GraphQL error';
            return throwError(() => new HttpException(message, 400));
          }

          return throwError(
            () =>
              new HttpException(
                'Failed to execute GraphQL query',
                error.response?.status || 500,
              ),
          );
        }),
      );
  }
}
