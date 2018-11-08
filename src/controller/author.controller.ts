import { Get, Controller, Param, Query, Res, HttpStatus, Body, Post, BadRequestException,
    InternalServerErrorException, NotFoundException, Put, UseGuards, Req } from '@nestjs/common';
import { AuthorService } from 'src/service/author.service';
import { Util } from 'src/util/util';
import { Author } from '@models';
import { ValidationPipe } from 'src/validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { AuthorCreateDto, AuthorEditDto } from '@dtos';
import { AuthService, ConfigService } from '@services';
import { RestAuthGuardGuest } from '@guards/rest.auth.guard.guest';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService,
              private readonly authService: AuthService,
    ) {}

    @Get('/list')
    @UseGuards(RestAuthGuardGuest)
    async listAuthor(@Query('max') max: number = 10, @Query('offset') offset: number = 0, @Res() res): Promise<any> {
        try {
            const list = await this.authorService.list(max, offset);
            return res.status(HttpStatus.OK).json(list);
        } catch (ex) {
            throw new InternalServerErrorException(Util.getMessage('internal_error'));
        }
    }

    @Get()
    @UseGuards(RestAuthGuardGuest)
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
    @UseGuards(RestAuthGuardGuest)
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
    @UseGuards(RestAuthGuardGuest)
    async createAuthor(@Body(new ValidationPipe()) authorDto: AuthorCreateDto, @Res() res): Promise<Author> {
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
    @UseGuards(RestAuthGuardGuest)
    async editAuthor(@Body(new ValidationPipe()) authorDto: AuthorEditDto, @Res() res): Promise<Author> {
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
