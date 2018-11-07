import { Provider } from '@nestjs/common';
import { AuthorResolver } from './resolver/author/author.resolver';

export const resolvers: Provider[] = [
    AuthorResolver,
];