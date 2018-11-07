import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Author } from '@models/author.entity';
import { controllers } from './app.module.controllers';
import { resolvers } from './app.module.resolvers';
import { services } from './app.module.services';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      typePaths: ['./**/*.graphql'],
    }),
    PassportModule.register({ defaultStrategy: 'jwt-guest' }),
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Author]), // pode ser colocado no modulo da feature
  ],
  controllers: [...controllers],
  providers: [...resolvers, ...services],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
