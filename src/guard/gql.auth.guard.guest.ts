import { Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@services';
import { User } from '@dtos';

@Injectable()
export class GqlAuthGuardGuest extends AuthGuard('jwt-guest') {

  constructor(private readonly authService: AuthService) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext) {
    const req = GqlExecutionContext.create(context).getContext().req;
    const user: User = this.authService.getUser(req);
    // console.log(user)
    // pode ser feito um guard espefico para uma rota
    // para checar se o usuario tem acesso ao recurso
    return super.canActivate(context);
  }
}