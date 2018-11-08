"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Util {
    constructor() { }
    static getMessage(code) {
        let message;
        message = {
            code,
            error: {
                message: 'erro',
            },
        };
        return message;
    }
    static getMessages(errors) {
        const messages = [];
        errors.forEach(error => {
            messages.push({
                code: error.property,
                error: error.constraints,
            });
        });
        return messages;
    }
}
exports.Util = Util;
//# sourceMappingURL=util.js.map