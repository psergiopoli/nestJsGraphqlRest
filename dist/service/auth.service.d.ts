import { JwtService } from '@nestjs/jwt';
import { Token } from '@utils';
import { User } from '@models';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    guestToken(): Token;
    getUser(req: any): User;
}
