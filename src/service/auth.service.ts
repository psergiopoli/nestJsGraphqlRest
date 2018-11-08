import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from '@utils';
import { User } from '@models';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService){}

    guestToken(): Token {
        const user: User = {
            id: -1,
            username: 'guest',
            roles: ['GUEST'],
        };

        const jwt = this.jwtService.sign(user);

        return {
            jwt,
            roles: ['GUEST'],
        };
    }

    getUser(req): User {
        const user = this.jwtService.verify(req.headers.authorization.replace('Bearer ', ''));
        return user;
    }
}