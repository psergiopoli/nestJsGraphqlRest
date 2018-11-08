import { Author } from 'src/model/author.entity';
import { Repository } from 'typeorm';
export declare class AuthorService {
    private readonly authorRepository;
    constructor(authorRepository: Repository<Author>);
    validate(author: Author): Promise<void>;
    findAuthor(id: number): Promise<Author>;
    createAuthor(author: Author): Promise<Author>;
    editAuthor(author: Author): Promise<Author>;
    list(max: number, offset: number): Promise<any>;
}
