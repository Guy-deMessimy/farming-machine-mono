import { Injectable } from '@nestjs/common';
import { GraphqlApiService } from '../graphql-api/graphql-api.service';
import { SignUpDto } from './dto/sign-up.dto';
import { Observable } from 'rxjs';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(private readonly graphqlApiService: GraphqlApiService) {}

  signUp({
    graphQlQuery,
    input,
  }: {
    graphQlQuery: string;
    input: SignUpDto;
  }): Observable<User> {
    // console.log('GRAPHQL QUERY', graphQlQuery);
    // console.log('INPUT', input);
    const response = this.graphqlApiService.execute<User>(graphQlQuery, { input });
    return response;
  }
}
