import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationGuard } from './authentication.guard';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { RefreshTokenGuard } from '../refresh-token-guard/refresh-token-guard.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthType } from '../../enums/auth-type.enum';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;
  let accessTokenGuard: jest.Mocked<AccessTokenGuard>;
  let refreshTokenGuard: jest.Mocked<RefreshTokenGuard>;
  let reflector: jest.Mocked<Reflector>;

  const mockContext: ExecutionContext = {
    getHandler: jest.fn(),
    getClass: jest.fn(),
    switchToHttp: jest.fn(),
    switchToRpc: jest.fn(),
    switchToWs: jest.fn(),
    getType: jest.fn(),
    getArgs: jest.fn(),
    getArgByIndex: jest.fn(),
    getArgByName: jest.fn(),
  } as unknown as ExecutionContext;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationGuard,
        {
          provide: AccessTokenGuard,
          useValue: {
            canActivate: jest.fn(),
          },
        },
        {
          provide: RefreshTokenGuard,
          useValue: {
            canActivate: jest.fn(),
          },
        },
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get(AuthenticationGuard);
    accessTokenGuard = module.get(AccessTokenGuard);
    refreshTokenGuard = module.get(RefreshTokenGuard);
    reflector = module.get(Reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should allow if AccessTokenGuard returns true (AuthType.Bearer)', async () => {
    reflector.getAllAndOverride.mockReturnValue([AuthType.Bearer]);
    accessTokenGuard.canActivate.mockResolvedValue(true);

    const result = await guard.canActivate(mockContext);
    expect(result).toBe(true);
    expect(accessTokenGuard.canActivate).toHaveBeenCalledWith(mockContext);
  });

  it('should allow if RefreshTokenGuard returns true (AuthType.Refresh)', async () => {
    reflector.getAllAndOverride.mockReturnValue([AuthType.Refresh]);
    refreshTokenGuard.canActivate.mockResolvedValue(true);

    const result = await guard.canActivate(mockContext);
    expect(result).toBe(true);
    expect(refreshTokenGuard.canActivate).toHaveBeenCalledWith(mockContext);
  });

  it('should allow with AuthType.None without calling any other guards', async () => {
    reflector.getAllAndOverride.mockReturnValue([AuthType.None]);

    const result = await guard.canActivate(mockContext);
    expect(result).toBe(true);
    expect(accessTokenGuard.canActivate).not.toHaveBeenCalled();
    expect(refreshTokenGuard.canActivate).not.toHaveBeenCalled();
  });

  it('should throw if all guards fail', async () => {
    reflector.getAllAndOverride.mockReturnValue([
      AuthType.Bearer,
      AuthType.Refresh,
    ]);

    accessTokenGuard.canActivate.mockRejectedValue(
      new UnauthorizedException('Bearer failed'),
    );
    refreshTokenGuard.canActivate.mockResolvedValue(false);

    await expect(guard.canActivate(mockContext)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should fallback to default AuthType if none is provided', async () => {
    reflector.getAllAndOverride.mockReturnValue(undefined);
    accessTokenGuard.canActivate.mockResolvedValue(true);

    const result = await guard.canActivate(mockContext);
    expect(result).toBe(true);
    expect(accessTokenGuard.canActivate).toHaveBeenCalled();
  });
});
