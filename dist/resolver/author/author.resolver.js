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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const author_service_1 = require("src/service/author.service");
const author_entity_1 = require("src/model/author.entity");
const common_1 = require("@nestjs/common");
const _guards_1 = require("@guards");
const _dtos_1 = require("@dtos");
const validation_pipe_1 = require("src/validation.pipe");
const _services_1 = require("@services");
let AuthorResolver = class AuthorResolver {
    constructor(authorService, authService) {
        this.authorService = authorService;
        this.authService = authService;
    }
    author(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authorService.findAuthor(id);
        });
    }
    createAuthor(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const author = {
                firstName: args.firstName,
                lastName: args.lastName,
                isActive: true,
                points: 100,
                dogName: args.dogName,
                id: null,
            };
            yield this.authorService.validate(author);
            const authorResponse = yield this.authorService.createAuthor(author);
            return authorResponse;
        });
    }
    authorFullName(author) {
        return __awaiter(this, void 0, void 0, function* () {
            return `${author.firstName} ${author.lastName}`;
        });
    }
};
__decorate([
    graphql_1.Query('author'),
    common_1.UseGuards(_guards_1.GqlAuthGuardGuest),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuthorResolver.prototype, "author", null);
__decorate([
    graphql_1.Mutation('createAuthor'),
    common_1.UseGuards(_guards_1.GqlAuthGuardGuest),
    __param(0, graphql_1.Args('authorCreateDto', new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_dtos_1.AuthorCreateDto]),
    __metadata("design:returntype", Promise)
], AuthorResolver.prototype, "createAuthor", null);
__decorate([
    graphql_1.ResolveProperty('fullName'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [author_entity_1.Author]),
    __metadata("design:returntype", Promise)
], AuthorResolver.prototype, "authorFullName", null);
AuthorResolver = __decorate([
    graphql_1.Resolver('Author'),
    __metadata("design:paramtypes", [author_service_1.AuthorService,
        _services_1.AuthService])
], AuthorResolver);
exports.AuthorResolver = AuthorResolver;
//# sourceMappingURL=author.resolver.js.map