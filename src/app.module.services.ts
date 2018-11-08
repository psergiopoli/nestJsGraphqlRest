import { Provider } from '@nestjs/common';
import { AuthService, AuthorService, ConfigService } from '@services';
import { JwtStrategyGuest, GqlAuthGuardGuest } from '@guards';

export const services: Provider[] = [
    AuthService,
    AuthorService,
    JwtStrategyGuest,
    GqlAuthGuardGuest,
    {
        provide: ConfigService,
        useValue: new ConfigService(`${process.env.NODE_ENV}.env`),
    },
];