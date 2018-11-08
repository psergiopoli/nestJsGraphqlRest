// tslint:disable-next-line:no-var-requires
require('tsconfig-paths/register');

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new DbErrorFilter());
  await app.listen(app.get('ConfigService').envConfig.PORT);
}
bootstrap();
