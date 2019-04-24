import { Injectable, ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@services';
import { User } from '@dtos';
import { Util } from '@utils';

@Injectable()
export class GqlAuthGuardGuest extends AuthGuard('jwt-guest') {

  constructor(private readonly authService: AuthService) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext) {
    const logger = new Logger(GqlAuthGuardGuest.name);
    try {
      await super.canActivate(context);
    } catch (err) {
      logger.error(err);
      throw new UnauthorizedException('unauthorized');
    }

    const req = GqlExecutionContext.create(context).getContext().req;
    const user: User = this.authService.getUser(req);

    const gqlContext = GqlExecutionContext.create(context).getContext();

    Util.setContext('user', user);
    Util.setContext('token', this.authService.getJwtPayload(req));

    logger.log(gqlContext.user);
    logger.log(gqlContext.req.body);

    // TODO: heres go the logic of user access
    // now all users with auth have access in decorated methods
    return true;
  }
}