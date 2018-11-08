import { QueryFailedError } from 'typeorm';
import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class DbErrorFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, _host: ArgumentsHost): void;
}
