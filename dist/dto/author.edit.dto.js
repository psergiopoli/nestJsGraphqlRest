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
const class_validator_1 = require("class-validator");
class AuthorEditDto {
}
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], AuthorEditDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(3, 100, {
        message: 'Primeiro nome tem que estar entre 3 e 100 caracteres',
    }),
    __metadata("design:type", String)
], AuthorEditDto.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(3, 100, {
        message: 'Segundo nome nome tem que estar entre 3 e 100 caracteres',
    }),
    __metadata("design:type", String)
], AuthorEditDto.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(3, 100, {
        message: 'Nome do dog tem que estar entre 3 e 100 caracteres',
    }),
    __metadata("design:type", String)
], AuthorEditDto.prototype, "dogName", void 0);
exports.AuthorEditDto = AuthorEditDto;
//# sourceMappingURL=author.edit.dto.js.map