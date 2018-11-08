import { AuthService } from '@services';
import { Token } from '@utils';
declare const JwtStrategyGuest_base: new (...args: any[]) => any;
export declare class JwtStrategyGuest extends JwtStrategyGuest_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(token: Token): boolean;
}
export {};
