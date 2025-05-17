// refresh-token.guard.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { RefreshTokenGuard } from './refresh-token-guard.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

describe('RefreshTokenGuard', () => {
  let guard: RefreshTokenGuard;
  let jwtService: JwtService;

  const mockJwtService = {
    verifyAsync: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      switch (key) {
        case 'jwt.secret':
          return 'my-secret';
        case 'jwt.audience':
          return 'http://localhost:4000';
        case 'jwt.issuer':
          return 'http://localhost:3001';
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshTokenGuard,
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    guard = module.get(RefreshTokenGuard);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should allow valid refresh token', async () => {
    const mockPayload = { sub: 'user-id' };
    jwtService.verifyAsync = jest.fn().mockResolvedValue(mockPayload);

    const context = createMockExecutionContext('valid-token');
    const result = await guard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should throw if token is missing', async () => {
    const context = createMockExecutionContext(undefined);
    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw if token is invalid', async () => {
    jwtService.verifyAsync = jest.fn().mockRejectedValue(new Error('invalid'));
    const context = createMockExecutionContext('invalid-token');
    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  function createMockExecutionContext(
    refreshToken: string | undefined,
  ): ExecutionContext {
    const req = {
      headers: refreshToken ? { 'x-refresh-token': refreshToken } : {},
    };

    return {
      switchToHttp: () => ({ getRequest: () => req }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;
  }
});
