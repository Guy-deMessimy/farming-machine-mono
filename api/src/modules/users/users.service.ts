import { Injectable, NotFoundException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { UsersRepository } from './users.repository';
import { GetUserInput } from './dto/get-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { DeleteUserResponse } from './dto/delete-user-response';
import { CreateUserInput } from './dto/create-user.dto';
import { User } from './users.entity';

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

  async findUser(input: GetUserInput): Promise<User | null> {
    const { id, email } = input;

    if (!id && !email) {
      throw new Error('At least id or email must be provided');
    }

    return this.repository.findOneBy(id ? { id } : { email });
  }

  async deleteById(input: GetUserInput): Promise<DeleteUserResponse> {
    const { id, email } = input;
    const user = this.repository.findOneBy(id ? { id } : { email });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.repository.delete(id ? { id } : { email });

    return {
      success: true,
      userId: id,
      message: `User ${input.id} successfully deleted`,
    };
  }

  createUser(input: CreateUserInput) {
    return 'This action adds a new user';
  }
}
