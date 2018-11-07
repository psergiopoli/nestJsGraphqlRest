import { Provider } from '@nestjs/common';
import { AuthService, AuthorService } from '@services';
import { JwtStrategyGuest, GqlAuthGuardGuest } from '@guards';

export const services: Provider[] = [
    AuthService,
    AuthorService,
    JwtStrategyGuest,
    GqlAuthGuardGuest,
];