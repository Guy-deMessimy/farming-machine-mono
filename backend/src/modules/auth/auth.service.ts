import { Injectable } from '@nestjs/common';
import { GraphqlApiService } from '../graphql-api/graphql-api.service';
import { SignUpDto } from './dto/sign-up.dto';
import { Observable } from 'rxjs';
import { User } from '../users/users.entity';
import { SignInDto } from './dto/sign-in.dto';
import { AuthPayload } from './dto/auth-payload.dto';

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
    const response = this.graphqlApiService.execute<User>(graphQlQuery, {
      input,
    });
    return response;
  }

  signIn({
    graphQlQuery,
    input,
  }: {
    graphQlQuery: string;
    input: SignInDto;
  }): Observable<AuthPayload> {
    return this.graphqlApiService.execute<AuthPayload>(graphQlQuery, { input });
  }

  refreshToken({
    graphQlQuery,
  }: {
    graphQlQuery: string;
  }): Observable<AuthPayload> {
    return this.graphqlApiService.execute<AuthPayload>(graphQlQuery);
  }
}
