import { Injectable } from '@nestjs/common';
import { GraphqlApiService } from '../graphql-api/graphql-api.service';
import { SignUpDto } from './dto/sign-up.dto';
import { Observable } from 'rxjs';
import { User } from '../users/users.entity';
import { SignInDto } from './dto/sign-in.dto';
import { AuthPayload } from './dto/auth-payload.dto';
import { Response } from 'express';

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
    headers,
  }: {
    graphQlQuery: string;
    headers?: string | string[] | undefined;
  }): Observable<AuthPayload> {
    const cleanHeaders =
      typeof headers === 'string' ? { authorization: headers } : undefined;
    return this.graphqlApiService.execute<AuthPayload>(
      graphQlQuery,
      {},
      cleanHeaders,
    );
  }

  logout(res: Response): boolean {
    res.clearCookie('accessToken', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    return true;
  }

  ping({
    graphQlQuery,
    headers,
  }: {
    graphQlQuery: string;
    headers?: string | string[] | undefined;
  }): Observable<string> {
    const cleanHeaders =
      typeof headers === 'string' ? { authorization: headers } : undefined;
    return this.graphqlApiService.execute(graphQlQuery, {}, cleanHeaders);
  }
}
