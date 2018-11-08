"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const passport_1 = require("@nestjs/passport");
const _services_1 = require("@services");
let GqlAuthGuardGuest = class GqlAuthGuardGuest extends passport_1.AuthGuard('jwt-guest') {
    constructor(authService) {
        super();
        this.authService = authService;
    }
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
    canActivate(context) {
        const req = graphql_1.GqlExecutionContext.create(context).getContext().req;
        const user = this.authService.getUser(req);
        return super.canActivate(context);
    }
};
GqlAuthGuardGuest = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [_services_1.AuthService])
], GqlAuthGuardGuest);
exports.GqlAuthGuardGuest = GqlAuthGuardGuest;
//# sourceMappingURL=gql.auth.guard.guest.js.map