// src/auth/auth.resolver.ts
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { Observable } from 'rxjs';
import { User } from '../users/users.entity';

@Resolver()
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  signUp(
    @Context() context?: { req: Request },
    @Args('input') input?: SignUpDto,
  ): Observable<User> {
    try {
      const graphQlQuery = context.req.body.query;
      // console.log('graphQlQuery RESOLVER', graphQlQuery)
      // console.log('input RESOLVER', input)
      if (typeof graphQlQuery !== 'string') {
        throw new Error('Request body query is not a string');
      }

      const result = this.authService.signUp({ graphQlQuery, input });
      return result;
    } catch (error) {
      this.logger.error('Resolver: signUp error:', error.stack);
      throw error;
    }
  }
}
