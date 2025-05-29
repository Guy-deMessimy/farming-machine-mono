import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UsersRepository } from '../../modules/users/users.repository';
import { HashingService } from '../hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { RefreshTokenIdsStorage } from './refresh-token-ids.storage/refresh-token-ids.storage';
import { ConflictException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import jwtConfig from '../config/jwt.config';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { InvalidatedRefreshTokenError } from '../../common/errors/index';
import { User } from 'src/modules/users/users.entity';

jest.mock('crypto', () => ({
  ...jest.requireActual('crypto'),
  randomUUID: jest.fn(() => 'mocked-refresh-id'),
}));

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let repository: jest.Mocked<UsersRepository>;
  let hashingService: jest.Mocked<HashingService>;
  let refreshTokenIdsStorage: jest.Mocked<RefreshTokenIdsStorage>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: UsersRepository,
          useValue: {
            create: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
        {
          provide: HashingService,
          useValue: {
            hash: jest.fn(),
            compare: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: RefreshTokenIdsStorage,
          useValue: {
            validate: jest.fn(),
            invalidate: jest.fn(),
            insert: jest.fn(),
          },
        },
        {
          provide: jwtConfig.KEY,
          useValue: {
            secret: 'test-secret',
            audience: 'test-audience',
            issuer: 'test-issuer',
            accessTokenTtl: 3600,
            refreshTokenTtl: 86400,
          },
        },
      ],
    }).compile();
    service = module.get<AuthenticationService>(AuthenticationService);
    repository = module.get(UsersRepository);
    hashingService = module.get(HashingService);
    refreshTokenIdsStorage = module.get(RefreshTokenIdsStorage);
    jwtService = module.get(JwtService) as jest.Mocked<JwtService>;

    jest.spyOn(service as any, 'generateTokens').mockResolvedValue({
      accessToken: 'fake-access-token',
      refreshToken: 'fake-refresh-token',
      user: { id: '1', email: 'test@example.com' },
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('signUp', () => {
    it('should hash the password and create a user', async () => {
      const dto: SignUpDto = {
        email: 'test@example.com',
        password: 'plain-pass',
      };

      const hashedPassword = 'hashed-pass';
      const createdUser = {
        id: '1',
        email: dto.email,
        password: hashedPassword,
      };

      (hashingService.hash as jest.Mock).mockResolvedValue(hashedPassword);
      (repository.create as jest.Mock).mockResolvedValue(createdUser);

      const result = await service.signUp(dto);

      expect(hashingService.hash).toHaveBeenCalledWith(dto.password);
      expect(repository.create).toHaveBeenCalledWith({
        email: dto.email,
        password: hashedPassword,
      });
      expect(result.email).toBe(dto.email);
      expect(result.password).toBe(hashedPassword);
    });

    it('should throw ConflictException on duplicate email', async () => {
      const dto: SignUpDto = {
        email: 'duplicate@example.com',
        password: 'pass',
      };

      (hashingService.hash as jest.Mock).mockResolvedValue('hash');
      (repository.create as jest.Mock).mockRejectedValue({ code: '23505' });

      await expect(service.signUp(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('signIn', () => {
    it('should return tokens when email and password match', async () => {
      const dto = {
        email: 'test@example.com',
        password: 'valid-password',
      };

      const mockUser = {
        id: '1',
        email: dto.email,
        password: 'hashed-password',
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
        posts: [],
        customer: null,
        refreshToken: null,
      };

      (repository.findOneBy as jest.Mock).mockResolvedValue(mockUser);
      (hashingService.compare as jest.Mock).mockResolvedValue(true);
      const result = await service.signIn(dto);

      expect(repository.findOneBy).toHaveBeenCalledWith({ email: dto.email });
      expect(hashingService.compare).toHaveBeenCalledWith(
        dto.password,
        mockUser.password,
      );

      expect(result).toEqual({
        accessToken: 'fake-access-token',
        refreshToken: 'fake-refresh-token',
        user: { id: '1', email: 'test@example.com' },
      });
    });

    it('should throw if password does not match', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'hash',
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
        posts: [],
        customer: null,
        refreshToken: null,
      };
      (repository.findOneBy as jest.Mock).mockResolvedValue(mockUser);
      (hashingService.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.signIn({ email: mockUser.email, password: 'wrongpass' }),
      ).rejects.toThrow('Password does not match');
    });
  });

  it('should throw UnauthorizedException when refresh token is invalid', async () => {
    const dto: RefreshTokenDto = {
      sub: '1',
      refreshTokenId: 'invalid-token',
      refreshToken: 'fake-refresh-token',
    };

    const mockUser = {
      id: '1',
      email: 'test@example.com',
      password: 'hash',
      name: 'Test User',
      createdAt: new Date(),
      updatedAt: new Date(),
      posts: [],
      customer: null,
      refreshToken: null,
    };

    (repository.findOneBy as jest.Mock).mockResolvedValue(mockUser);
    (refreshTokenIdsStorage.validate as jest.Mock).mockResolvedValue(false);

    await expect(service.refreshTokens(dto)).rejects.toThrow(
      new UnauthorizedException('Unauthorized'),
    );
  });

  it('should throw UnauthorizedException("Access denied") on InvalidatedRefreshTokenError', async () => {
    const dto: RefreshTokenDto = {
      sub: '1',
      refreshTokenId: 'token-x',
      refreshToken: 'x-refresh-token',
    };

    (repository.findOneBy as jest.Mock).mockRejectedValue(
      new InvalidatedRefreshTokenError(),
    );

    await expect(service.refreshTokens(dto)).rejects.toThrow(
      new UnauthorizedException('Access denied'),
    );
  });

  it('should throw UnauthorizedException on unknown error', async () => {
    const dto: RefreshTokenDto = {
      sub: '1',
      refreshTokenId: 'token-x',
      refreshToken: 'x-refresh-token',
    };

    (repository.findOneBy as jest.Mock).mockRejectedValue(new Error('DB down'));

    await expect(service.refreshTokens(dto)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should generate access and refresh tokens, insert refreshTokenId and return full payload', async () => {
    (service as any).generateTokens.mockRestore();
    const user = {
      id: 'user-1',
      email: 'user@example.com',
      password: 'hashed',
      name: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      posts: [],
      customer: null,
      refreshToken: null,
    };

    (jwtService.signAsync as jest.Mock).mockResolvedValueOnce('access-token');
    (jwtService.signAsync as jest.Mock).mockResolvedValueOnce('refresh-token');

    const result = await service.generateTokens(user);

    expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
    expect(jwtService.signAsync).toHaveBeenNthCalledWith(
      1,
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: 'test-secret',
        issuer: 'test-issuer',
        audience: 'test-audience',
        expiresIn: 3600,
      },
    );
    expect(jwtService.signAsync).toHaveBeenNthCalledWith(
      2,
      {
        sub: user.id,
        refreshTokenId: 'mocked-refresh-id',
      },
      {
        secret: 'test-secret',
        issuer: 'test-issuer',
        audience: 'test-audience',
        expiresIn: 86400,
      },
    );

    expect(refreshTokenIdsStorage.insert).toHaveBeenCalledWith(
      user.id,
      'mocked-refresh-id',
    );

    expect(result).toEqual({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      user,
    });
  });
});
