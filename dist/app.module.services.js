"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _services_1 = require("@services");
const _guards_1 = require("@guards");
exports.services = [
    _services_1.AuthService,
    _services_1.AuthorService,
    _guards_1.JwtStrategyGuest,
    _guards_1.GqlAuthGuardGuest,
    {
        provide: _services_1.ConfigService,
        useValue: new _services_1.ConfigService(`${process.env.NODE_ENV}.env`),
    },
];
//# sourceMappingURL=app.module.services.js.map