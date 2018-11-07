import { IsString, Length } from 'class-validator';

export class AuthorCreateRequest {

    @IsString()
    @Length(3, 100, {
        message: 'Primeiro nome tem que estar entre 3 e 100 caracteres',
    })
    readonly firstName: string;

    @IsString()
    @Length(3, 100, {
        message: 'Segundo nome nome tem que estar entre 3 e 100 caracteres',
    })
    readonly lastName: string;

    @IsString()
    @Length(3, 100, {
        message: 'Nome do dog tem que estar entre 3 e 100 caracteres',
    })
    readonly dogName: string;
}