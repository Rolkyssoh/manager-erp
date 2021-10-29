import {
  Injectable,
  UnauthorizedException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { ROLES, SUPER_ADMIN } from '@merp/constants';

@Injectable()
export class RoleValidationGuard implements CanActivate {
  constructor(private acceptableRoles: typeof ROLES = [SUPER_ADMIN]) {}

  canActivate(ctx: ExecutionContext) {
    const { user } = ctx.switchToHttp().getRequest();
    // console.log({user})
    if (!user?.role) {
      throw new UnauthorizedException('User has no role');
    }

    if (this.acceptableRoles.includes(user.role.id)) {
      return true;
    } else {
      throw new UnauthorizedException(
        "You don't have the credentials to carry out the operation"
      );
    }
  }
}
