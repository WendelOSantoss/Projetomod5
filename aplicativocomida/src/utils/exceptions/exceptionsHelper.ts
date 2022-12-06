import {
    BadRequestException,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';

import { Exception } from './IExceptions';

export enum Exceptions {
    InvalidData,
    DatabaseException,
    NotFoundData,
    UnauthorizedException,
}

export function HandleException({ message, exception }: Exception) {
    if (
        exception === Exceptions.InvalidData ||
        exception === Exceptions.NotFoundData
    ) {
        throw new BadRequestException(message ? message : 'Invalid data');
    }
    if (exception === Exceptions.DatabaseException) {
        throw new InternalServerErrorException('Error in database');
    }
    if (exception === Exceptions.UnauthorizedException) {
        throw new UnauthorizedException(
            message ? message : "You haven't permission to make this action"
        );
    }
}
