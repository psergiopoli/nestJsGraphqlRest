import { Injectable, ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@services';
import { User } from '@dtos';
import { Util } from '@utils';

@Injectable()
export class RestAuthGuardGuest extends AuthGuard('jwt-guest') {

  constructor(private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const logger = new Logger(RestAuthGuardGuest.name);
    try {
      await super.canActivate(context);
    } catch (err) {
      logger.error(err);
      throw new UnauthorizedException('unauthorized');
    }

    const req = context.switchToHttp().getRequest();
    const user: User = this.authService.getUser(req);
    logger.log(user);
    logger.log(req.query.id);

    Util.setContext('user', user);
    Util.setContext('token', this.authService.getJwtPayload(req));

    // TODO: heres go the logic of user access
    // now all users with auth have access in decorated methods
    return true;
  }
}