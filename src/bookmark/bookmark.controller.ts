import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { getUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { CreateBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  @Get()
  findAll(@getUser('id') userId: number) {}

  @Get()
  findOne(
    @getUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number
  ) {}

  @Post()
  create(
    @getUser('id') userId: number,
    @Body() dto: CreateBookmarkDto
  ) {}

  @Patch()
  edit(@getUser('id') userId: number) {}

  @Delete()
  delete(@getUser('id') userId: number) {}
}
