import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { getUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findMany() {
    return this.usersService.findMany();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.findOne(userId);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Patch()
  edit(
    @getUser('id') userId: number,
    @Body() dto: EditUserDto
  ) {
    return this.usersService.edit(userId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.delete(userId);
  }
}
