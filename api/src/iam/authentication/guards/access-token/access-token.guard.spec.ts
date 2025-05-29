import { Test, TestingModule } from '@nestjs/testing';
import { AccessTokenGuard } from './access-token.guard';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../../../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { REQUEST_USER_KEY } from '../../../iam.constants';

describe('AccessTokenGuard', () => {
  let guard: AccessTokenGuard;
  let jwtService: jest.Mocked<JwtService>;

  const mockJwtConfig = {
    secret: 'test-secret',
    audience: 'test-audience',
    issuer: 'test-issuer',
    accessTokenTtl: 3600,
    refreshTokenTtl: 86400,
  } as ConfigType<typeof jwtConfig>;

  let context: ExecutionContext;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccessTokenGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: jwtConfig.KEY,
          useValue: mockJwtConfig,
        },
      ],
    }).compile();

    guard = module.get(AccessTokenGuard);
    jwtService = module.get(JwtService);
  });

  const mockExecutionContext = (headers: Record<string, string> = {}) => {
    const req = { headers };
    jest.spyOn(GqlExecutionContext, 'create').mockReturnValue({
      getContext: () => ({ req }),
    } as unknown as GqlExecutionContext);
    return req;
  };

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should throw if token is missing', async () => {
    mockExecutionContext();

    await expect(guard.canActivate({} as ExecutionContext)).rejects.toThrow(
      new UnauthorizedException('Missing access token'),
    );
  });

  it('should throw if token is invalid', async () => {
    mockExecutionContext({ authorization: 'Bearer invalid.token' });
    jwtService.verifyAsync.mockRejectedValue(new Error('invalid'));

    await expect(guard.canActivate({} as ExecutionContext)).rejects.toThrow(
      new UnauthorizedException('Invalid or expired token'),
    );
  });

  it('should attach payload to request and return true on valid token', async () => {
    const payload = { sub: 'user-123', email: 'test@example.com' };
    const req = mockExecutionContext({
      authorization: 'Bearer valid.token',
    });

    jwtService.verifyAsync.mockResolvedValue(payload);

    const result = await guard.canActivate({} as ExecutionContext);

    expect(result).toBe(true);
    expect(jwtService.verifyAsync).toHaveBeenCalledWith(
      'valid.token',
      mockJwtConfig,
    );
    expect(req[REQUEST_USER_KEY]).toEqual(payload);
  });
});
