import { Provider } from '@nestjs/common';
import { AuthService, AuthorService } from '@services';
import { JwtStrategyGuest, GqlAuthGuardGuest } from '@guards';
import { ConfigService } from '@conf';

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