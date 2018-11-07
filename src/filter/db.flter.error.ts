import { QueryFailedError } from 'typeorm';
import { Catch, ExceptionFilter, InternalServerErrorException, ArgumentsHost } from '@nestjs/common';

@Catch(QueryFailedError)
export class DbErrorFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, _host: ArgumentsHost) {
        console.log(exception);
        throw new InternalServerErrorException(exception.message);
    }
}