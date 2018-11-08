import { MessageUtil } from './message.util';
import { ValidationError } from 'class-validator/validation/ValidationError';
export declare class Util {
    constructor();
    static getMessage(code: string): MessageUtil;
    static getMessages(errors: ValidationError[]): MessageUtil[];
}
