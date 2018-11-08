import { Get, Controller, Param } from '@nestjs/common';
import { Query } from '@nestjs/graphql';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  root(): any {
    return {
      msg: 'App is running',
    };
  }
}
