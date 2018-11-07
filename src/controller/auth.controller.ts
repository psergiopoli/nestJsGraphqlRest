import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from '@services';
import { Token } from '@utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    ) {}

    @Get()
    getToken(@Res() res): Token {
        return res.status(HttpStatus.OK).json(this.authService.guestToken());
    }
}
