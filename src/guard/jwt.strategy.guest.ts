import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '@services';
import { Token } from '@utils';
import { ConfigService } from '@conf';

@Injectable()
export class JwtStrategyGuest extends PassportStrategy(Strategy, 'jwt-guest') {
  constructor(private readonly authService: AuthService,
              private readonly confService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: confService.envConfig.JWT_SECRET,
    });
  }

  validate(token: Token) {
    if (token) {
      return true;
    }
    return false;
  }
}