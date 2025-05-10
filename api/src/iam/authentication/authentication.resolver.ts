import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { User } from '../../modules/users/users.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthPayload } from './dto/auth-payload.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';

@Auth(AuthType.None)
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
    @Context() { req }: { req: Request },
  ): Promise<AuthPayload> {
    const { accessToken, user } = await this.authenticationService.signIn(
      input,
    );
    return { accessToken, user };
  }
}
