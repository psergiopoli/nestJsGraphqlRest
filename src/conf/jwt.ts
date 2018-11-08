import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@services';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

export function JwtConf(): DynamicModule {
  const configService = new ConfigService(`${process.env.NODE_ENV}.env`);

  return JwtModule.register({
    secretOrPrivateKey: 'secretKey',
    signOptions: {
      expiresIn: 3600, // Usar nestJs config
    },
  });
}

export function Passport(): DynamicModule {
  return PassportModule.register({ defaultStrategy: 'jwt-guest' });
}