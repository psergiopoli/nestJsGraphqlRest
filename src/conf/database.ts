import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Env } from './env';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import * as models from '@models';
import * as migrations from '../migrations';

function MigrationsArray() {
  return Object.values(migrations);
}

export function ModelsArray() {
  return Object.values(models);
}

export function DatabaseConf(): TypeOrmModuleOptions & Partial<MysqlConnectionOptions> {
  return {
    type: 'mysql',
    host: Env.dbHost(),
    port: Env.dbPort(),
    username: Env.dbUsername(),
    password: Env.dbPassword(),
    database: Env.dbDatabase(),
    entities: ModelsArray(),
    migrations: MigrationsArray(),
    migrationsRun: true,
    synchronize: false, // Database update automatically,
    logging: false, // Log sql statements
    cli: {
      // migrations folder (yarn typeorm)
      migrationsDir: 'src/migrations',
    },
  };
}

export function DatabaseModule(): DynamicModule {
  return TypeOrmModule.forRoot(DatabaseConf());
}

export function Models(): DynamicModule {
  return TypeOrmModule.forFeature(ModelsArray());
}