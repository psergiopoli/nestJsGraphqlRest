import { AuthService } from '@services';
import { Token } from '@utils';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getToken(res: any): Token;
}
