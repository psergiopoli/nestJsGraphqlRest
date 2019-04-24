import { Resolver, Query, Args, ResolveProperty, Parent, Mutation } from '@nestjs/graphql';
import { UseGuards, Logger } from '@nestjs/common';
import { GqlAuthGuardGuest } from '@guards';
import { AuthorCreateDto, User } from '@dtos';
import { ValidationPipe } from '@pipes';
import { AuthService, AuthorService } from '@services';
import { Author } from '@models';
import { JwtPayload, UserRequest } from 'src/decorator/context';
import { Token } from '@utils/token';

@Resolver('Author')
export class AuthorResolver {
  constructor( private readonly authorService: AuthorService,
               private readonly authService: AuthService,
    ) {}

  private logger: Logger = new Logger(AuthorResolver.name);

  @Query('author')
  @UseGuards(GqlAuthGuardGuest)
  async author(@Args('id') id: number, @JwtPayload() jwt: Token, @UserRequest() user: User): Promise<Author> {
    this.logger.log(`user requesting author: ${jwt.username}`);
    this.logger.log(jwt);
    this.logger.log(user);
    return this.authorService.findAuthor(id);
  }

  @Mutation('createAuthor')
  @UseGuards(GqlAuthGuardGuest)
  async createAuthor(@Args('authorCreateDto', new ValidationPipe()) args: AuthorCreateDto): Promise<Author> {
    const author = {
      firstName: args.firstName,
      lastName: args.lastName,
      isActive: true,
      points: 100,
      dogName: args.dogName,
      id: null,
    };

    await this.authorService.validate(author);
    const authorResponse = await this.authorService.createAuthor(author);
    return authorResponse;
  }

  @ResolveProperty('fullName')
  async authorFullName(@Parent() author: Author) {
    return `${author.firstName} ${author.lastName}`;
  }

}