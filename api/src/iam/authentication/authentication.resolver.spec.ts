import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationResolver } from './authentication.resolver';
import { AuthenticationService } from './authentication.service';
import { PubSub } from 'graphql-subscriptions';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from '../../modules/users/users.entity';
import { SignInDto } from './dto/sign-in.dto';
import { AuthPayload } from './dto/auth-payload.dto';
import { RefreshTokenPayload } from './interfaces/refresh-token-payload.interface';
import { RefreshTokenRequest } from './interfaces/refresh-token-request.interface';

describe('AuthenticationResolver', () => {
  let resolver: AuthenticationResolver;
  let authenticationService: jest.Mocked<AuthenticationService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationResolver,
        {
          provide: AuthenticationService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
            refreshTokens: jest.fn(),
          },
        },
        {
          provide: PubSub,
          useValue: {}, // Vous pouvez fournir un mock de PubSub si nécessaire
        },
      ],
    }).compile();

    resolver = module.get<AuthenticationResolver>(AuthenticationResolver);
    authenticationService = module.get(AuthenticationService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('signUp', () => {
    it('should return a user after successful signup', async () => {
      const input: SignUpDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const user: User = {
        id: '1',
        email: input.email,
      } as User;

      authenticationService.signUp.mockResolvedValue(user);

      const result = await resolver.signUp(input);
      expect(result).toEqual(user);
      expect(authenticationService.signUp).toHaveBeenCalledWith(input);
    });
  });

  describe('signIn', () => {
    it('should return auth payload after successful signin', async () => {
      const input: SignInDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const authPayload = {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        user: {
          id: '1',
          email: input.email,
        } as User,
      };

      authenticationService.signIn.mockResolvedValue(authPayload);
      const mockRequest = {
        headers: {
          authorization: 'Bearer faketoken',
        },
      } as unknown as Request;

      const context = { req: mockRequest };

      const result = await resolver.signIn(input, context);
      expect(result).toEqual(authPayload);
      expect(authenticationService.signIn).toHaveBeenCalledWith(input);
    });
  });

  describe('refreshToken', () => {
    it('should return auth payload after successful refresh', async () => {
      const refreshToken = 'fake-refresh-token';
      const payload: RefreshTokenPayload = {
        sub: 'user-123',
        refreshTokenId: 'refresh-456',
        email: 'test@example.com',
      };

      const authPayload = {
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
        user: {
          id: 'user-123',
          email: 'test@example.com',
        } as User,
      };

      authenticationService.refreshTokens.mockResolvedValue(authPayload);
      const mockRequest = {
        refreshToken,
        refreshTokenPayload: payload,
      } as unknown as RefreshTokenRequest;

      const context = { req: mockRequest };

      const result = await resolver.refreshToken(context);
      expect(result).toEqual(authPayload);
      expect(authenticationService.refreshTokens).toHaveBeenCalledWith({
        sub: 'user-123',
        refreshToken: 'fake-refresh-token',
        refreshTokenId: 'refresh-456',
      });
    });
  });

  describe('ping', () => {
    it('should return pong', async () => {
      const result = await resolver.ping();
      expect(result).toEqual('pong');
    });
  });
});
