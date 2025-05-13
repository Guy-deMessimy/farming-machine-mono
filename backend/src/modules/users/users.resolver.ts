import { Resolver, Query, Context, Args } from '@nestjs/graphql';
import { Request } from 'express';
import { Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { Observable } from 'rxjs';

@Resolver(() => User)
export class UsersResolver {
  private readonly logger = new Logger(UsersResolver.name);
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { nullable: true })
  getUser(@Context() context: { req: Request }): Observable<User | null> {
    try {
      const graphQlQuery = context.req.body.query;
      return this.usersService.findUser({
        graphQlQuery,
        headers: context.req.headers['authorization'],
      });
    } catch (error) {
      this.logger.error('Resolver: getUser error:', error.stack);
      throw error;
    }
  }
}
