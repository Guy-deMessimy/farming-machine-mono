import { Test, TestingModule } from '@nestjs/testing';
import { PubSub } from 'graphql-subscriptions';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './users.entity';
// dto
import { UserQueryDto } from './dto/user-query.dto';
import { GetUserInput } from './dto/get-user.dto';
import { DeleteUserResponse } from './dto/delete-user-response';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let usersService: jest.Mocked<UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: {
            findAllUsers: jest.fn(),
            findUser: jest.fn(),
            deleteById: jest.fn(),
            createUser: jest.fn(),
          },
        },
        {
          provide: PubSub,
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get(UsersResolver);
    usersService = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return all users with query', async () => {
    const query: UserQueryDto = { limit: 10 };
    const mockUsers = [
      {
        id: '1',
        email: 'test@test.com',
        password: 'hashed',
        name: 'Jean', // ← ajoute même si optionnel
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    usersService.findAllUsers.mockResolvedValue(mockUsers);

    const result = await resolver.findAllUsers(query);

    expect(usersService.findAllUsers).toHaveBeenCalledWith(query);
    expect(result).toEqual(mockUsers);
  });

  it('should return user from getUser using @ActiveUser', async () => {
    const mockUser = { sub: '123', email: 'user@test.com' };
    const expectedUser = { id: '123', email: 'user@test.com' } as User;

    usersService.findUser.mockResolvedValue(expectedUser);

    const result = await resolver.getUser(mockUser);

    expect(usersService.findUser).toHaveBeenCalledWith({
      email: 'user@test.com',
    });
    expect(result).toEqual(expectedUser);
  });

  it('should delete user and return result', async () => {
    const input: GetUserInput = { id: 'user-123' };
    const mockResponse: DeleteUserResponse = {
      success: true,
      message: 'User deleted',
      userId: 'user-123',
    };

    usersService.deleteById.mockResolvedValue(mockResponse);

    const result = await resolver.deleteUser(input);

    expect(usersService.deleteById).toHaveBeenCalledWith(input);
    expect(result).toEqual(mockResponse);
  });
});
