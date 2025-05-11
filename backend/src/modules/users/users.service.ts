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
    query,
    authHeader,
  }: {
    graphQlQuery: string;
    query: string;
    authHeader?: string;
  }): Observable<User | null> {
    return this.graphqlApiService.execute<User>(
      graphQlQuery,
      {
        query,
      },
      authHeader,
    );
  }
}
