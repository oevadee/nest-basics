import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { getUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UsersService } from './users.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findOne(
    @getUser() user: User
    // @getUser('email') email: string
  ) {
    return user;
  }

  @Patch()
  edit(
    @getUser('id') userId: number,
    @Body() dto: EditUserDto
  ) {
    return this.usersService.edit(userId, dto);
  }
}
