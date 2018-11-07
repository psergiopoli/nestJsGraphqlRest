import { Get, Controller, Param, Query, Res, HttpStatus, Body, Post, BadRequestException,
    InternalServerErrorException, NotFoundException, Put, UseGuards } from '@nestjs/common';
import { AuthorService } from 'src/service/author.service';
import { Util } from 'src/util/util';
import { Author } from '@models';
import { AuthorCreateRequest } from 'src/request/author.create.request';
import { ValidationPipe } from 'src/validation.pipe';
import { AuthorEditRequest } from 'src/request/author.edit.request';
import { AuthGuard } from '@nestjs/passport';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService,
    ) {}

    @Get('/list')
    @UseGuards(AuthGuard('jwt-guest'))
    async listAuthor(@Query('max') max: number = 10, @Query('offset') offset: number = 0, @Res() res): Promise<any> {
        try {
            const list = await this.authorService.list(max, offset);
            return res.status(HttpStatus.OK).json(list);
        } catch (ex) {
            throw new InternalServerErrorException(Util.getMessage('internal_error'));
        }
    }

    @Get()
    @UseGuards(AuthGuard('jwt-guest'))
    async find(@Query('id') id, @Res() res): Promise<Author> {
    if (id != null) {
        let author;
        try {
            author = await this.authorService.findAuthor(id);
        } catch (ex) {
            throw new InternalServerErrorException(Util.getMessage('internal_error'));
        }

        if (author){
            return res.status(HttpStatus.OK).json(author);
        } else {
            throw new NotFoundException(Util.getMessage('not_found'));
        }
    }
    throw new BadRequestException(Util.getMessage('bad_request'));
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt-guest'))
    async findByPath(@Param('id') id, @Res() res): Promise<Author> {
    if (id != null) {
        let author;
        try {
            author = await this.authorService.findAuthor(id);
        } catch (ex) {
            throw new InternalServerErrorException(Util.getMessage('internal_error'));
        }

        if (author){
            return res.status(HttpStatus.OK).json(author);
        } else {
            throw new NotFoundException(Util.getMessage('not_found'));
        }
    }
    throw new BadRequestException(Util.getMessage('bad_request'));
    }

    @Post()
    @UseGuards(AuthGuard('jwt-guest'))
    async createAuthor(@Body(new ValidationPipe()) authorDto: AuthorCreateRequest, @Res() res): Promise<Author> {
    const author = {
        firstName: authorDto.firstName,
        lastName: authorDto.lastName,
        isActive: true,
        points: 100,
        dogName: authorDto.dogName,
        id: null,
    };

    await this.authorService.validate(author);
    const authorResponse = await this.authorService.createAuthor(author);
    return res.status(HttpStatus.OK).json(authorResponse);
    }

    @Put()
    @UseGuards(AuthGuard('jwt-guest'))
    async editAuthor(@Body(new ValidationPipe()) authorDto: AuthorEditRequest, @Res() res): Promise<Author> {
    let author;

    try {
        author = await this.authorService.findAuthor(authorDto.id);
    } catch (ex) {
        throw new InternalServerErrorException(Util.getMessage('internal_error'));
    }

    if (author){
        author.firstName = authorDto.firstName;
        author.lastName = authorDto.lastName;
        author.dogName = authorDto.dogName;
    } else {
        throw new NotFoundException(Util.getMessage('not_found'));
    }

    await this.authorService.validate(author);

    const authorResponse = await this.authorService.editAuthor(author);
    return res.status(HttpStatus.OK).json(authorResponse);
    }

    // deleteAuthor
}
