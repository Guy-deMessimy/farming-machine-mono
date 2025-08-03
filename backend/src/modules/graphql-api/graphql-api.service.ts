import {
  Injectable,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import FormData from 'form-data';
import { HttpService } from '@nestjs/axios/dist';
import { catchError, map, Observable, pipe, throwError } from 'rxjs';
import { FileUpload } from 'graphql-upload';
import { AxiosResponse } from 'axios';

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

    const hasFileUpload =
      variables?.file &&
      typeof variables.file === 'object' &&
      typeof variables.file.createReadStream === 'function';

    if (hasFileUpload) {
      const { filename, mimetype, createReadStream }: FileUpload =
        variables.file;
      const operations = JSON.stringify({
        query: graphQlQuery,
        variables: { file: null },
      });

      const map = JSON.stringify({ '0': ['variables.file'] });
      const form = new FormData();
      form.append('operations', operations);
      form.append('map', map);
      form.append('0', createReadStream(), {
        filename,
        contentType: mimetype,
      });
      return this.httpService
        .post<{ data?: Record<string, any>; errors?: any[] }>(
          process.env.API_URL || 'http://localhost:3000/graphql',
          form,
          {
            headers: {
              ...form.getHeaders(), // FormData gère lui-même le bon content-type avec boundary
              'x-apollo-operation-name': 'uploadFile', // 👈 CSRF bypass
              ...headers,
            },
          },
        )
        .pipe(this.mapAndCatch());
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
      .pipe(this.mapAndCatch());
  }

  private mapAndCatch<T>() {
    return pipe(
      map(
        (
          response: AxiosResponse<{
            data?: Record<string, any>;
            errors?: any[];
          }>,
        ) => {
          const raw = response.data;
          if (raw.errors?.length) {
            throw {
              isGraphQLError: true,
              graphQLErrors: raw.errors,
            };
          }

          const data = raw.data;
          if (!data) throw new Error('No data found in GraphQL response');
          const topLevelKey = Object.keys(data)[0];
          return data[topLevelKey];
        },
      ),
      catchError((error) => {
        if (error.isGraphQLError && error.graphQLErrors?.length) {
          const firstError = error.graphQLErrors[0];
          const message = firstError.message || 'GraphQL error';
          const statusCode =
            firstError.extensions?.exception?.status ??
            (firstError.extensions?.code === 'UNAUTHENTICATED' ? 401 : 400);
          return throwError(
            () =>
              new HttpException(
                message,
                statusCode === 401 ? 401 : statusCode || 400,
              ),
          );
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
