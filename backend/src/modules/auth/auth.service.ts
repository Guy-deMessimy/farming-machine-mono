import { Injectable } from '@nestjs/common';
import { GraphqlApiService } from '../graphql-api/graphql-api.service';
import { SignUpDto } from './dto/sign-up.dto';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly graphqlApiService: GraphqlApiService) {}

  signUp({
    graphQlQuery,
    input,
  }: {
    graphQlQuery: string;
    input: SignUpDto;
      }): Observable<any> {
      console.log('GRAPHQL QUERY', graphQlQuery)
      console.log('INPUT', input)
    //   const response = this.graphqlApiService.execute(graphQlQuery, input);
      const response = this.graphqlApiService.execute(graphQlQuery, { input });
    return response;
  }
}
