// refresh-token.guard.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { RefreshTokenGuard } from './refresh-token-guard.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import jwtConfig from '../../../config/jwt.config';
import { REQUEST_USER_KEY } from '../../../iam.constants';

describe('RefreshTokenGuard', () => {
  let guard: RefreshTokenGuard;
  let jwtService: jest.Mocked<JwtService>;

  const mockJwtConfig = {
    secret: 'test-secret',
    audience: 'test-audience',
    issuer: 'test-issuer',
    accessTokenTtl: 3600,
    refreshTokenTtl: 86400,
  } as ConfigType<typeof jwtConfig>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshTokenGuard,
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

    guard = module.get(RefreshTokenGuard);
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
      new UnauthorizedException('Missing access refresh token'),
    );
  });

  it('should throw if token is invalid', async () => {
    mockExecutionContext({ authorization: 'Bearer invalid.token' });
    jwtService.verifyAsync.mockRejectedValue(new Error('invalid'));

    await expect(guard.canActivate({} as ExecutionContext)).rejects.toThrow(
      new UnauthorizedException('Invalid or expired refresh token'),
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
