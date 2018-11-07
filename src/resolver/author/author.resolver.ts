import { Resolver, Query, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { AuthorService } from 'src/service/author.service';
import { Author } from 'src/model/author.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuardGuest } from '@guards';

@Resolver('Author')
export class AuthorResolver {
  constructor( private readonly authorService: AuthorService,
    ) {}

  @Query()
  @UseGuards(GqlAuthGuardGuest)
  async author(@Args('id') id: number) {
    return this.authorService.findAuthor(id);
  }

  @ResolveProperty('fullName')
  async authorFullName(@Parent() author: Author) {
    return `${author.firstName} ${author.lastName}`;
  }
}