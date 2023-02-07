import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    return req.user?.claims.incudes('all');
  }
}
