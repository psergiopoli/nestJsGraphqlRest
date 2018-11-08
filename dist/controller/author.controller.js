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
const common_1 = require("@nestjs/common");
const author_service_1 = require("src/service/author.service");
const util_1 = require("src/util/util");
const validation_pipe_1 = require("src/validation.pipe");
const _dtos_1 = require("@dtos");
const _services_1 = require("@services");
const rest_auth_guard_guest_1 = require("@guards/rest.auth.guard.guest");
let AuthorController = class AuthorController {
    constructor(authorService, authService) {
        this.authorService = authorService;
        this.authService = authService;
    }
    listAuthor(max = 10, offset = 0, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = yield this.authorService.list(max, offset);
                return res.status(common_1.HttpStatus.OK).json(list);
            }
            catch (ex) {
                throw new common_1.InternalServerErrorException(util_1.Util.getMessage('internal_error'));
            }
        });
    }
    find(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id != null) {
                let author;
                try {
                    author = yield this.authorService.findAuthor(id);
                }
                catch (ex) {
                    throw new common_1.InternalServerErrorException(util_1.Util.getMessage('internal_error'));
                }
                if (author) {
                    return res.status(common_1.HttpStatus.OK).json(author);
                }
                else {
                    throw new common_1.NotFoundException(util_1.Util.getMessage('not_found'));
                }
            }
            throw new common_1.BadRequestException(util_1.Util.getMessage('bad_request'));
        });
    }
    findByPath(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id != null) {
                let author;
                try {
                    author = yield this.authorService.findAuthor(id);
                }
                catch (ex) {
                    throw new common_1.InternalServerErrorException(util_1.Util.getMessage('internal_error'));
                }
                if (author) {
                    return res.status(common_1.HttpStatus.OK).json(author);
                }
                else {
                    throw new common_1.NotFoundException(util_1.Util.getMessage('not_found'));
                }
            }
            throw new common_1.BadRequestException(util_1.Util.getMessage('bad_request'));
        });
    }
    createAuthor(authorDto, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const author = {
                firstName: authorDto.firstName,
                lastName: authorDto.lastName,
                isActive: true,
                points: 100,
                dogName: authorDto.dogName,
                id: null,
            };
            yield this.authorService.validate(author);
            const authorResponse = yield this.authorService.createAuthor(author);
            return res.status(common_1.HttpStatus.OK).json(authorResponse);
        });
    }
    editAuthor(authorDto, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let author;
            try {
                author = yield this.authorService.findAuthor(authorDto.id);
            }
            catch (ex) {
                throw new common_1.InternalServerErrorException(util_1.Util.getMessage('internal_error'));
            }
            if (author) {
                author.firstName = authorDto.firstName;
                author.lastName = authorDto.lastName;
                author.dogName = authorDto.dogName;
            }
            else {
                throw new common_1.NotFoundException(util_1.Util.getMessage('not_found'));
            }
            yield this.authorService.validate(author);
            const authorResponse = yield this.authorService.editAuthor(author);
            return res.status(common_1.HttpStatus.OK).json(authorResponse);
        });
    }
};
__decorate([
    common_1.Get('/list'),
    common_1.UseGuards(rest_auth_guard_guest_1.RestAuthGuardGuest),
    __param(0, common_1.Query('max')), __param(1, common_1.Query('offset')), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], AuthorController.prototype, "listAuthor", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(rest_auth_guard_guest_1.RestAuthGuardGuest),
    __param(0, common_1.Query('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthorController.prototype, "find", null);
__decorate([
    common_1.Get('/:id'),
    common_1.UseGuards(rest_auth_guard_guest_1.RestAuthGuardGuest),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthorController.prototype, "findByPath", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(rest_auth_guard_guest_1.RestAuthGuardGuest),
    __param(0, common_1.Body(new validation_pipe_1.ValidationPipe())), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_dtos_1.AuthorCreateDto, Object]),
    __metadata("design:returntype", Promise)
], AuthorController.prototype, "createAuthor", null);
__decorate([
    common_1.Put(),
    common_1.UseGuards(rest_auth_guard_guest_1.RestAuthGuardGuest),
    __param(0, common_1.Body(new validation_pipe_1.ValidationPipe())), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_dtos_1.AuthorEditDto, Object]),
    __metadata("design:returntype", Promise)
], AuthorController.prototype, "editAuthor", null);
AuthorController = __decorate([
    common_1.Controller('author'),
    __metadata("design:paramtypes", [author_service_1.AuthorService,
        _services_1.AuthService])
], AuthorController);
exports.AuthorController = AuthorController;
//# sourceMappingURL=author.controller.js.map