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
  }: {
    graphQlQuery: string;
    query: any;
  }): Observable<User> {
    const response = this.graphqlApiService.execute<User>(graphQlQuery, {
      query,
    });
    return response;
  }
}
