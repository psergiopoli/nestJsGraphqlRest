import { createParamDecorator } from '@nestjs/common';
import { Util } from '@utils';
import { Token } from 'graphql';
import { User } from '@dtos';

export const JwtPayload = createParamDecorator((_, args): Token => {
    return Util.getContext('token');
});

export const UserRequest = createParamDecorator((_, args): User => {
    return Util.getContext('user');
});
