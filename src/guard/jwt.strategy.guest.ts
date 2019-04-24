import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '@services';
import { Token } from '@utils';
import { Env } from '@conf/env';

@Injectable()
export class JwtStrategyGuest extends PassportStrategy(Strategy, 'jwt-guest') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Env.jwtSecret(),
    });
  }

  validate(token: Token) {
    // return Boolean(token);
    if (token) {
      return true;
    }
    return false;
  }
}