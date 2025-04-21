import { AccessTokenGuard } from './access-token.guard';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/iam/config/jwt.config';
import { ConfigType } from '@nestjs/config';

describe('AccessTokenGuard', () => {
  let guard: AccessTokenGuard;
  beforeEach(() => {
    const mockJwtService = {} as JwtService;
    const mockJwtConfig = {
      secret: 'test-secret',
      audience: 'test-audience',
      issuer: 'test-issuer',
    } as ConfigType<typeof jwtConfig>;

    guard = new AccessTokenGuard(mockJwtService, mockJwtConfig);
  });
  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
