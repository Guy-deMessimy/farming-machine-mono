import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { PubSub } from 'graphql-subscriptions';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let repository: jest.Mocked<UsersRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            findAll: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: PubSub,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllUsers', () => {
    it('should return all users', async () => {
      const users = [
        {
          id: '1',
          email: 'test@test.com',
          password: 'hashed',
          name: 'Jean', // ← ajoute même si optionnel
          createdAt: new Date(),
          updatedAt: new Date(),
          roleId: 'role-uuid-viewer'
        },
      ];
      repository.findAll.mockResolvedValue(users);
      const result = await service.findAllUsers();
      expect(result).toEqual(users);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findUser', () => {
    it('should return a user by id', async () => {
      const user = {
        id: '1',
        email: 'test@test.com',
        password: 'hashed',
        name: 'Jean', // ← ajoute même si optionnel
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 'role-uuid-viewer'
      };
      repository.findOneBy.mockResolvedValue(user);
      const result = await service.findUser({ id: '1' });
      expect(result).toEqual(user);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    });

    it('should return a user by email', async () => {
      const user = {
        id: '2',
        email: 'mail@mail.com',
        password: 'hashed',
        name: 'Jean', // ← ajoute même si optionnel
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 'role-uuid-viewer'
      };
      repository.findOneBy.mockResolvedValue(user);
      const result = await service.findUser({ email: 'mail@mail.com' });
      expect(result).toEqual(user);
      expect(repository.findOneBy).toHaveBeenCalledWith({
        email: 'mail@mail.com',
      });
    });

    it('should throw error if neither id nor email provided', async () => {
      await expect(service.findUser({})).rejects.toThrow(
        'At least id or email must be provided',
      );
    });
  });

  describe('deleteById', () => {
    it('should delete user and return success message', async () => {
      const user = {
        id: '1',
        email: 'test@test.com',
        password: 'hashed',
        name: 'Jean', // ← ajoute même si optionnel
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 'role-uuid-viewer'
      };
      repository.findOneBy.mockResolvedValue(user);
      repository.delete.mockResolvedValue(undefined);

      const result = await service.deleteById({ id: '1' });

      expect(result).toEqual({
        success: true,
        userId: '1',
        message: 'User 1 successfully deleted',
      });
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(repository.delete).toHaveBeenCalledWith({ id: '1' });
    });

    it('should throw NotFoundException if user not found', async () => {
      repository.findOneBy.mockResolvedValue(null);

      await expect(service.deleteById({ id: '999' })).rejects.toThrow(
        NotFoundException,
      );

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: '999' });
    });
  });

  describe('createUser', () => {
    it('should return a placeholder string', () => {
      const result = service.createUser({} as any);
      expect(result).toBe('This action adds a new user');
    });
  });
});
