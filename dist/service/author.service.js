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
const typeorm_1 = require("@nestjs/typeorm");
const author_entity_1 = require("src/model/author.entity");
const typeorm_2 = require("typeorm");
const util_1 = require("src/util/util");
let AuthorService = class AuthorService {
    constructor(authorRepository) {
        this.authorRepository = authorRepository;
    }
    validate(author) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUnique = yield this.authorRepository.
                createQueryBuilder('author').
                where('author.dogName = :dogName', { dogName: author.dogName }).
                getCount();
            if (checkUnique > 0) {
                throw new common_1.BadRequestException(util_1.Util.getMessage('dogname_unique'));
            }
        });
    }
    findAuthor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authorRepository.findOne(id);
        });
    }
    createAuthor(author) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authorRepository.save(author);
        });
    }
    editAuthor(author) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authorRepository.save(author);
        });
    }
    list(max, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authorRepository.findAndCount({
                skip: offset,
                take: max,
            });
        });
    }
};
AuthorService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(author_entity_1.Author)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthorService);
exports.AuthorService = AuthorService;
//# sourceMappingURL=author.service.js.map