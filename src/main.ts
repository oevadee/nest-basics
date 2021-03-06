import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Glaveyard api')
    .setDescription('Rare clothing company api')
    .setVersion('0.0.1')
    .addTag('glaveyard')
    .build();
  const document = SwaggerModule.createDocument(
    app,
    config
  );
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
