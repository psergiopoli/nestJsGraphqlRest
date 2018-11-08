import { ExecutionContext } from '@nestjs/common';
import { AuthService } from '@services';
declare const GqlAuthGuardGuest_base: import("@nestjs/passport/dist/interfaces/type.interface").Type<import("@nestjs/passport/dist/auth.guard").IAuthGuard>;
export declare class GqlAuthGuardGuest extends GqlAuthGuardGuest_base {
    private readonly authService;
    constructor(authService: AuthService);
    getRequest(context: ExecutionContext): any;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs/internal/Observable").Observable<boolean>;
}
export {};
