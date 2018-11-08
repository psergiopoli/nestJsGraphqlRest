import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '@services';
import { Token } from '@utils';

@Injectable()
export class JwtStrategyGuest extends PassportStrategy(Strategy, 'jwt-guest') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey',
    });
  }

  validate(token: Token) {
    if (token) {
      return true;
    }
    return false;
  }
}