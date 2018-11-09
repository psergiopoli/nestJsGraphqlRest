import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '@models';
import { ConfigService } from '@conf';

export function DatabaseModule(): DynamicModule {
  const configService = new ConfigService(`${process.env.NODE_ENV}.env`);

  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: configService.envConfig.DB_HOST,
    port: parseInt(configService.envConfig.DB_PORT, 10),
    username: configService.envConfig.DB_USERNAME,
    password: configService.envConfig.DB_PASSWORD,
    database: configService.envConfig.DB_DATABASE,
    entities: [Author],
    synchronize: true,
  });
}

export function Models(): DynamicModule {
  return TypeOrmModule.forFeature([Author]);
}