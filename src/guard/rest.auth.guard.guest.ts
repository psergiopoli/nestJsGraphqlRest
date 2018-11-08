import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@services';

@Injectable()
export class RestAuthGuardGuest extends AuthGuard('jwt-guest') {

  constructor(private readonly authService: AuthService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    // const user: User = this.authService.getUser(req);
    // console.log(user);
    // console.log(req.query.id); // acessa o parametro bla?id=15, 15

    // pode ser feito um guard espefico para uma rota
    // para checar se o usuario tem acesso ao recurso
    return super.canActivate(context);
  }
}