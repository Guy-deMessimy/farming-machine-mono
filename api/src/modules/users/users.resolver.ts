import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Logger, UnauthorizedException, UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { UsersService } from './users.service';
import { GetUserInput } from './dto/get-user.dto';
import { UserQueryDto } from './dto//user-query.dto';
import { User } from './users.entity';
import { DeleteUserResponse } from './dto/delete-user-response';
import { CreateUserInput } from './dto/create-user.dto';
import { ActiveUser } from '../../iam/decorators/active-user.decorator';
import { ActiveUserData } from '../../iam/authentication/interfaces/active-user-data.interface';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';

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
  async getUser(@ActiveUser() user: ActiveUserData): Promise<User | null> {
    this.logger.debug(`User ${user?.sub} called getUser query`);
    return this.usersService.findUser({ email: user.email });
  }

  @Mutation(() => DeleteUserResponse)
  async deleteUser(
    @Args('input') input: GetUserInput,
  ): Promise<DeleteUserResponse> {
    return this.usersService.deleteById(input);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<string> {
    return this.usersService.createUser(input);
  }
}
