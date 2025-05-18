import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { AuthenticationService } from './authentication.service';
import { User } from '../../modules/users/users.entity';
// dto
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthPayload } from './dto/auth-payload.dto';
// decorators, enum, interfaces
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { RefreshTokenRequest } from './interfaces/refresh-token-request.interface';

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
    const { accessToken, user, refreshToken } =
      await this.authenticationService.signIn(input);
    return { accessToken, user, refreshToken };
  }

  @Mutation(() => AuthPayload)
  @Auth(AuthType.Refresh)
  async refreshToken(
    @Context() ctx: { req: RefreshTokenRequest },
  ): Promise<AuthPayload> {
    const refreshToken = ctx.req.refreshToken;
    const sub = ctx.req.refreshTokenPayload?.sub;
    return this.authenticationService.refreshTokens({ sub, refreshToken });
  }
}
