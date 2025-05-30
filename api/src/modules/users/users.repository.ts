import { Injectable, Logger } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UserQueryDto } from './dto/user-query.dto';

@Injectable()
export class UsersRepository {
  private readonly logger = new Logger(UsersRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(query?: UserQueryDto): Promise<User[]> {
    const { limit, offset, cursor, orderBy, where } = query || {};

    return this.prisma.user.findMany({
      skip: offset,
      take: limit,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy,
      where,
      include: {
        customer: true,
        posts: true,
      },
    });
  }

  async findOneBy(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where,
      include: {
        customer: true,
        posts: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
