import { Get, Controller, Param } from '@nestjs/common';
import { AuthorService } from './service/author.service';
import { Query } from '@nestjs/graphql';

@Controller()
export class AppController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  root(@Query('id') id): any {
    return {
      msg: 'App is running',
    };
  }
}
