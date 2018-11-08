import { AuthorService } from 'src/service/author.service';
import { Author } from 'src/model/author.entity';
import { AuthorCreateDto } from '@dtos';
import { AuthService } from '@services';
export declare class AuthorResolver {
    private readonly authorService;
    private readonly authService;
    constructor(authorService: AuthorService, authService: AuthService);
    author(id: number): Promise<Author>;
    createAuthor(args: AuthorCreateDto): Promise<Author>;
    authorFullName(author: Author): Promise<string>;
}
