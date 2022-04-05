import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { getUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UsersService } from './users.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('find-one')
  findOne(
    @getUser() user: User
    // @getUser('email') email: string
  ) {
    return user;
  }
}
