import { MessageUtil } from './message.util';
import { ValidationError } from 'class-validator/validation/ValidationError';
import * as httpContext from 'express-http-context';

export class Util {

  constructor() {}

  static setContext(key: string, object: any): void {
    httpContext.set(key, object);
  }

  static getContext(key: string): any {
    return httpContext.get(key);
  }

  static getMessage(code: string): MessageUtil {
    let message: MessageUtil;

    message = {
        code,
        error: {
          message: 'erro',
        },
    };

    return message;
  }

  static getMessages(errors: ValidationError[]): MessageUtil[] {
    const messages: MessageUtil[] = [];

    errors.forEach(error => {
      messages.push({
        code: error.property,
        error: error.constraints,
      });
    });

    return messages;
  }
}
