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
import { TransactionService } from './transaction.service';
import {
  CreateTransactionDto,
  EditTransactionDto,
} from './dto';

@UseGuards(JwtGuard)
@Controller('transactions')
export class TransactionController {
  constructor(
    private bookmarkService: TransactionService
  ) {}
  @Get()
  findAll(@getUser('id') userId: number) {
    return this.bookmarkService.findAll(userId);
  }

  @Get(':id')
  findOne(
    @getUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number
  ) {
    return this.bookmarkService.findOne(userId, bookmarkId);
  }

  @Post()
  create(
    @getUser('id') userId: number,
    @Body() dto: CreateTransactionDto
  ) {
    return this.bookmarkService.create(userId, dto);
  }

  @Patch(':id')
  edit(
    @getUser('id') userId: number,
    @Body() dto: EditTransactionDto,
    @Param('id', ParseIntPipe) bookmarkId: number
  ) {
    return this.bookmarkService.edit(
      userId,
      dto,
      bookmarkId
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(
    @getUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number
  ) {
    return this.bookmarkService.delete(userId, bookmarkId);
  }
}
