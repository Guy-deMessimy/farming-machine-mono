import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Logger } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { User } from './users.entity';
import { GraphqlApiService } from '../graphql-api/graphql-api.service';

@Injectable()
export class UsersService {
  constructor(private readonly graphqlApiService: GraphqlApiService) {}

  findUser({
    graphQlQuery,
    headers,
  }: {
    graphQlQuery: string;
    headers?: string | string[] | undefined;
  }): Observable<User | null> {
    const cleanHeaders =
      typeof headers === 'string' ? { authorization: headers } : undefined;
    return this.graphqlApiService.execute<User>(graphQlQuery, {}, cleanHeaders);
  }
}
