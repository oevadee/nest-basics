import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateTransactionDto,
  EditTransactionDto,
} from './dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  findAll(userId: number) {
    return this.prisma.transaction.findMany({
      where: {
        userId,
      },
    });
  }

  findOne(userId: number, transactionId: number) {
    return this.prisma.transaction.findFirst({
      where: {
        id: transactionId,
        userId,
      },
    });
  }

  async create(userId: number, dto: CreateTransactionDto) {
    const transaction =
      await this.prisma.transaction.create({
        data: {
          userId,
          ...dto,
        },
      });

    return transaction;
  }

  async edit(
    userId: number,
    dto: EditTransactionDto,
    transactionId: number
  ) {
    // get the transaction by id
    const transaction =
      await this.prisma.transaction.findUnique({
        where: {
          id: transactionId,
        },
      });

    // check if user owns the transaction
    if (!transaction || transaction.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        ...dto,
      },
    });
  }

  async delete(userId: number, transactionId: number) {
    // get the transaction by id
    const transaction =
      await this.prisma.transaction.findUnique({
        where: {
          id: transactionId,
        },
      });

    // check if user owns the transaction
    if (!transaction || transaction.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    await this.prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });
  }
}
