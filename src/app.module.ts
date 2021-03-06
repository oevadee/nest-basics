import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transactions/transaction.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    TransactionModule,
    PrismaModule,
  ],
})
export class AppModule {}
