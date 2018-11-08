import { ExecutionContext } from '@nestjs/common';
import { AuthService } from '@services';
declare const RestAuthGuardGuest_base: import("@nestjs/passport/dist/interfaces/type.interface").Type<import("@nestjs/passport/dist/auth.guard").IAuthGuard>;
export declare class RestAuthGuardGuest extends RestAuthGuardGuest_base {
    private readonly authService;
    constructor(authService: AuthService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs/internal/Observable").Observable<boolean>;
}
export {};
