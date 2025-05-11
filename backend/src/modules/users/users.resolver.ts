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
  getUser(
    @Context() context: { req: Request },
    @Args('query', { nullable: true }) query?: string,
  ): Observable<User | null> {
    try {
      const authHeader = context.req.headers['authorization'];
      const graphQlQuery = context.req.body.query;

      if (typeof graphQlQuery !== 'string') {
        throw new Error('Request body query is not a string');
      }

      return this.usersService.findUser({
        graphQlQuery,
        query,
        authHeader,
      });
    } catch (error) {
      this.logger.error('Resolver: getUser error:', error.stack);
      throw error;
    }
  }
}
