import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { AuthenticationService } from './authentication.service';
import { User } from '../../modules/users/users.entity';
import { SignUpDto } from './dto/sign-up.dto';

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
}
