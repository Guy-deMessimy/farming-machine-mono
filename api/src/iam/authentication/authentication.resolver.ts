import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { User } from '../../modules/users/users.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthPayload } from './dto/auth-payload.dto';

@Resolver()
export class AuthenticationResolver {
  private readonly logger = new Logger(AuthenticationResolver.name);
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly pubSub: PubSub,
  ) {}

  @Mutation(() => User)
  async signUp(@Args('input') input: SignUpDto): Promise<User> {
    // this.logger.debug(`findAllEngineTypes called in resolver with query: ${query}`);
    return this.authenticationService.signUp(input);
  }

  @Mutation(() => AuthPayload)
  async signIn(
    @Args('input') input: SignInDto,
    @Context() { req }: { req: Request }
  ): Promise<AuthPayload> {
    const { accessToken, user } = await this.authenticationService.signIn(
      input,
    );
    console.log('CONTEXT', req);
    // securiser le cookie avec le context (acceder au cookie necessite de le tester via react car apollo sandbox ne renvoit pas de cookes)
    // context.res.cookie('accessToken', accessToken, {
    //   httpOnly: true,
    //   // secure: process.env.NODE_ENV === 'production',
    //   secure: true,
    //   // sameSite: 'lax', // ou strict
    //   sameSite: true,
    //   // maxAge: 1000 * 60 * 60, // 1h
    // });
    return { accessToken, user };
  }
}
