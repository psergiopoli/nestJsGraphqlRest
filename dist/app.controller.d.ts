import { AuthorService } from './service/author.service';
export declare class AppController {
    private readonly authorService;
    constructor(authorService: AuthorService);
    root(id: any): any;
}
