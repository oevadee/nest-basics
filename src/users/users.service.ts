import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findMany() {
    const users = await this.prisma.user.findMany();
    users.forEach((user) => delete user.hash);
    return users;
  }

  async findOne(userId: number) {
    const { hash, ...user } =
      await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    return user;
  }

  async create(dto: CreateUserDto) {
    const defaultHash = await argon.hash('test123');
    const { hash, ...user } = await this.prisma.user.create(
      {
        data: { ...dto, hash: defaultHash },
      }
    );
    return user;
  }

  async edit(userId: number, dto: EditUserDto) {
    const { hash, ...user } = await this.prisma.user.update(
      {
        where: {
          id: userId,
        },
        data: {
          ...dto,
        },
      }
    );

    return user;
  }

  async delete(userId: number) {
    const { firstName, lastName } =
      await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });
    return `User ${firstName} ${lastName} was successfully deleted`;
  }
}
