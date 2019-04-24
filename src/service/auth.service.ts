import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from '@utils';
import { User } from '@dtos';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService){}

    getJwtPayload(request): Token {
        const token = request.headers.authorization.replace('Bearer ', '');
        return this.jwtService.verify(token);
    }

    guestToken(): any {
        const user: User = {
            id: -1,
            username: 'guest',
            roles: ['GUEST'],
        };

        const jwt = this.jwtService.sign(user);

        return jwt;
    }

    // TODO, need to use a database or api auth
    getUser(req): User {
        const user = this.jwtService.verify(req.headers.authorization.replace('Bearer ', ''));
        return user;
    }
}