import { Injectable } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Engine } from './engine.entity';
import { HttpService } from '@nestjs/axios/dist';
// import { EngineQueryDto } from './engine-query.dto';

@Injectable()
export class EngineService {
  constructor(private readonly httpService: HttpService) {}

  // getEngineList(requestBody: any): Observable<Engine[]> {
  //   const variables = {
  //     // limit: 5,
  //     // offset: query.offset,
  //     orderBy: { brandName: 'DESC' },
  //     // where: query.where,
  //   };
  //   const payload = {
  //     query: requestBody,
  //     variables: variables,
  //   };

  //   console.log('Extracted query in service:', payload);
  //   const response = this.httpService
  //     .post<{ data: { getEngines: Engine[] } }>(
  //       process.env.API_URL || 'http://localhost:3000/graphql',
  //       payload,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     )
  //     .pipe(
  //       map((response) => {
  //         // console.log('Received response from API:', response.data);
  //         console.log(
  //           'Received response from API:',
  //           JSON.stringify(response.data, null, 2),
  //         );
  //         // Retourner les données des engines
  //         return response.data.data.getEngines;
  //       }),
  //       catchError((error) => {
  //         console.error('Error during API call:', error.message);
  //         if (error.response) {
  //           console.error('Error response data:', error.response.data);
  //           console.error('Error response status:', error.response.status);
  //           console.error('Error response headers:', error.response.headers);
  //         }
  //         return throwError(() => new Error('Failed to query API'));
  //       }),
  //     );
  //   console.log('RESPONSE', response);
  //   return response;
  // }

  getEngineList(query?: any): Observable<Engine[]> {
    // const payload = {
    //   query: query?.query, // La requête envoyée par le front
    //   variables: query?.variables, // Les variables envoyées par le front
    // };
    // console.log('Extracted query in service:', payload);
    const payload = {
      query: `
      query GetEngines($query: EngineQueryDto) {
        getEngines(query: $query) {
          id
          modelName
          brandName
          conception
          engineKwPower
          engineCcPower
          maxKmhSpeed
          petrolLitreTank
          tankLitre
          weightKg
          workingWidth
          copiesNumber
          imageUrl
        }
      }
    `,
      variables: { query },
    };
    console.log('Extracted query in service:', payload);

    return this.httpService
      .post<{ data: { getEngines: Engine[] } }>(
        process.env.API_URL || 'http://localhost:3000/graphql',
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .pipe(
        map((response) => response.data.data.getEngines),
        catchError((error) => {
          console.error('Error during API call:', error.message);
          throw new Error('Failed to query API');
        }),
      );
  }
}
