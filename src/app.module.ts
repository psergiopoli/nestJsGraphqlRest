import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { controllers } from './app.module.controllers';
import { resolvers } from './app.module.resolvers';
import { services } from './app.module.services';
import { JwtConf, GraphqlConf, Models, Passport, DatabaseModule } from '@conf';

@Module({
  imports: [
    JwtConf(),
    Passport(),
    GraphqlConf(),
    DatabaseModule(),
    Models(),
  ],
  controllers: [...controllers],
  providers: [...resolvers, ...services],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
