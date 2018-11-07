import { MessageUtil } from './message.util';
import { ValidationError } from 'class-validator/validation/ValidationError';

export class Util {

  constructor() {}

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
