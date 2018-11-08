import { Resolver, Query, Args, ResolveProperty, Parent, Mutation } from '@nestjs/graphql';
import { AuthorService } from 'src/service/author.service';
import { Author } from 'src/model/author.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuardGuest } from '@guards';
import { AuthorCreateDto } from '@dtos';
import { ValidationPipe } from 'src/validation.pipe';

@Resolver('Author')
export class AuthorResolver {
  constructor( private readonly authorService: AuthorService,
    ) {}

  @Query('author')
  @UseGuards(GqlAuthGuardGuest)
  async author(@Args('id') id: number): Promise<Author> {
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