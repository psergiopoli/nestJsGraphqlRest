import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from '@utils';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService){}

    guestToken(): Token {
        const jwt = this.jwtService.sign({
            id: '-1',
            user: 'guest',
            roles: ['GUEST'],
        });

        return {
            jwt,
            roles: ['GUEST'],
        };
    }
}