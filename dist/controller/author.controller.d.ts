import { AuthorService } from 'src/service/author.service';
import { Author } from '@models';
import { AuthorCreateDto, AuthorEditDto } from '@dtos';
import { AuthService } from '@services';
export declare class AuthorController {
    private readonly authorService;
    private readonly authService;
    constructor(authorService: AuthorService, authService: AuthService);
    listAuthor(max: number, offset: number, res: any): Promise<any>;
    find(id: any, res: any): Promise<Author>;
    findByPath(id: any, res: any): Promise<Author>;
    createAuthor(authorDto: AuthorCreateDto, res: any): Promise<Author>;
    editAuthor(authorDto: AuthorEditDto, res: any): Promise<Author>;
}
