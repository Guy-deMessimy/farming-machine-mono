import { Injectable, NotFoundException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { UsersRepository } from './users.repository';
import { GetUserInput } from './dto/get-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { DeleteUserResponse } from './dto/delete-user-response';
import { CreateUserInput } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    private repository: UsersRepository,
    private readonly pubSub: PubSub,
  ) {}

  async findAllUsers(query?: UserQueryDto) {
    const usersList = await this.repository.findAll(query);
    return usersList;
  }

  async findById(userId: GetUserInput) {
    const user = await this.repository.findById(userId);
    return user;
  }

  async deleteById(input: GetUserInput): Promise<DeleteUserResponse> {
    const user = await this.repository.findById(input);
    if (!user) {
      throw new NotFoundException(`User with id ${input.id} not found`);
    }

    await this.repository.delete(input);

    return {
      success: true,
      userId: input.id,
      message: `User ${input.id} successfully deleted`,
    };
  }

  createUser(input: CreateUserInput) {
    return 'This action adds a new user';
  }
}
