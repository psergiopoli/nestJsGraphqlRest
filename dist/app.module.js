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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const author_entity_1 = require("@models/author.entity");
const app_module_controllers_1 = require("./app.module.controllers");
const app_module_resolvers_1 = require("./app.module.resolvers");
const app_module_services_1 = require("./app.module.services");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const path_1 = require("path");
const database_1 = require("./database");
let AppModule = class AppModule {
    constructor(connection) {
        this.connection = connection;
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            jwt_1.JwtModule.register({
                secretOrPrivateKey: 'secretKey',
                signOptions: {
                    expiresIn: 3600,
                },
            }),
            graphql_1.GraphQLModule.forRoot({
                context: ({ req }) => ({ req }),
                typePaths: ['./**/*.graphql'],
                definitions: {
                    path: path_1.join(process.cwd(), 'src/schema/graphql.schema.ts'),
                    outputAs: 'class',
                },
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt-guest' }),
            database_1.DatabaseModule(),
            typeorm_1.TypeOrmModule.forFeature([author_entity_1.Author]),
        ],
        controllers: [...app_module_controllers_1.controllers],
        providers: [...app_module_resolvers_1.resolvers, ...app_module_services_1.services],
    }),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map