import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/user.dto';
import { User } from './interfaces/user.interface';
import { nanoid } from 'nanoid';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(user: CreateUserDto): User {
    const id = nanoid();
    const newUser = {
      ...user,
      id,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(userId: string): User {
    return this.users.find(({ id }) => id === userId);
  }

  remove(userId: string): string {
    let userName = '';
    this.users.filter(({ id, firstName, lastName }) => {
      userName = `${firstName} ${lastName}`;
      return id === userId;
    });
    return `User ${userName} was deleted`;
  }
}
