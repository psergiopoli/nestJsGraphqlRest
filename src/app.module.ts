import {  DynamicModule } from '@nestjs/common';
import { Connection } from 'typeorm';
import { JwtConf, GraphqlConf, Models, Passport, DatabaseModule } from '@conf';
import { Provider } from '@nestjs/common';
import * as controller from '@controllers';
import * as service from '@services';
import * as guard from '@guards';
import * as resolver from './resolver';
import * as dotenv from 'dotenv';

export const resolvers: Provider[] = Object.values(resolver);

export const services: Provider[] = [
    ...Object.values(service),
    ...Object.values(guard),
];

export const controllers: any[] = Object.values(controller);

export class AppModule {

  public static forRoot(): DynamicModule {
    dotenv.config();
    return {
      module: AppModule,
      imports: [
        JwtConf(),
        Passport(),
        GraphqlConf(),
        DatabaseModule(),
        Models(),
      ],
      controllers: [...controllers],
      providers: [...resolvers, ...services],
    };
  }

  constructor(private readonly connection: Connection) {}
}
