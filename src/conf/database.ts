import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Env } from './env';
import * as models from '@models';

export function DatabaseModule(): DynamicModule {
  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: Env.dbHost(),
    port: Env.dbPort(),
    username: Env.dbUsername(),
    password: Env.dbPassword(),
    database: Env.dbDatabase(),
    entities: [...Object.values(models)],
    synchronize: true, // Database update automatically
  });
}

export function Models(): DynamicModule {
  return TypeOrmModule.forFeature([...Object.values(models)]);
}