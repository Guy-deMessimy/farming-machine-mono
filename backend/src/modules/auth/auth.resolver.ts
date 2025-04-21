// src/auth/auth.resolver.ts
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { Observable } from 'rxjs';
import { User } from '../users/users.entity';
import { AuthPayload } from './dto/auth-payload.dto';
import { SignInDto } from './dto/sign-in.dto';

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

  @Mutation(() => AuthPayload)
  signIn(
    @Context() context?: { req: Request },
    @Args('input') input?: SignInDto,
  ): Observable<AuthPayload> {
    try {
      const graphQlQuery = context.req.body.query;
      if (typeof graphQlQuery !== 'string') {
        throw new Error('Request body query is not a string');
      }

      return this.authService.signIn({ graphQlQuery, input });
    } catch (error) {
      this.logger.error('Resolver: signIn error:', error.stack);
      throw error;
    }
  }
}
