export class AuthorCreateDto {
    firstName?: string;
    lastName?: string;
    dogName?: string;
}

export class Author {
    id?: number;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    dogName?: string;
    points?: number;
    isActive?: boolean;
}

export abstract class IMutation {
    abstract createAuthor(authorCreateDto?: AuthorCreateDto): Author | Promise<Author>;
}

export abstract class IQuery {
    abstract author(id: number): Author | Promise<Author>;

    abstract temp__(): boolean | Promise<boolean>;
}
