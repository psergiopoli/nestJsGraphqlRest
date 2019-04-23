import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env } from '@conf/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRoot());
  // app.useGlobalFilters(new DbErrorFilter());
  await app.listen(Env.port());
}
bootstrap();
