import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { UsersService } from './users.service';
import { GetUserInput } from './dto/get-user.dto';
import { UserQueryDto } from './dto//user-query.dto';
import { User } from './users.entity';
import { DeleteUserResponse } from './dto/delete-user-response';

@Resolver()
export class UsersResolver {
  private readonly logger = new Logger(UsersResolver.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly pubSub: PubSub,
  ) {}

  @Query(() => [User], { name: 'findAllUsers', nullable: true })
  async findAllUsers(
    @Args('query', { nullable: true }) query?: UserQueryDto,
  ): Promise<User[]> {
    return this.usersService.findAllUsers(query);
  }

  @Query(() => User, { nullable: true })
  async getUser(@Args('input') input: GetUserInput): Promise<User | null> {
    return this.usersService.findById(input);
  }

  @Mutation(() => DeleteUserResponse)
  async deleteUser(
    @Args('input') input: GetUserInput,
  ): Promise<DeleteUserResponse> {
    return this.usersService.deleteById(input);
  }
}
