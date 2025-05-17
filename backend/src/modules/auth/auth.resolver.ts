// src/auth/auth.resolver.ts
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Logger, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from '../users/users.entity';
import { AuthPayload } from './dto/auth-payload.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Resolver()
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  @Public()
  signUp(
    @Context() context?: { req: Request },
    @Args('input') input?: SignUpDto,
  ): Observable<User> {
    try {
      const graphQlQuery = context.req.body.query;
      const result = this.authService.signUp({ graphQlQuery, input });
      return result;
    } catch (error) {
      this.logger.error('Resolver: signUp error:', error.stack);
      throw error;
    }
  }

  @Mutation(() => AuthPayload)
  @Public()
  async signIn(
    @Context() ctx?: any,
    @Args('input') input?: SignInDto,
  ): Promise<AuthPayload> {
    const { req, res }: { req: Request; res: Response } = ctx;
    console.log('🚀 ~ AuthResolver ~ res:', res);
    const graphQlQuery = req.body.query;
    // Converts an observable to a promise by subscribing to the obervable and returning a promise that will be resolved upon the arrival of the first value from the observable. The subscription will then be close .
    const { accessToken, refreshToken, user } = await firstValueFrom(
      this.authService.signIn({ graphQlQuery, input }),
    );
    console.log('🚀 ~ AuthResolver ~ refreshToken:', refreshToken);
    console.log('[🧪] Token renvoyé par AuthService:', accessToken);
    if (!accessToken || !refreshToken) {
      throw new UnauthorizedException('Tokens are missing');
    }

    // Protection for the XSS
    // Le cookie est transmis uniquement via les en-têtes HTTP Set-Cookie, pas dans le corps JSON.
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      // secure true ne passe pas en local sans https
      secure: process.env.NODE_ENV === 'production',
      // sameSite: 'lax', // ou strict
      sameSite: true,
      // maxAge: 1000 * 60 * 60, // 1h
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 jours
    });

    return { user };
  }

  @Mutation(() => AuthPayload)
  async refreshToken(@Context() ctx?: any): Promise<AuthPayload> {
    const { req, res }: { req: Request; res: Response } = ctx;
    const graphQlQuery = req.body.query;
    const { accessToken, user, refreshToken } = await firstValueFrom(
      this.authService.refreshToken({ graphQlQuery }),
    );

    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token');
    }

    return { accessToken, user, refreshToken };
  }
}
