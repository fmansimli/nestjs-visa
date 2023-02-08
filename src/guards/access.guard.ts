import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const claims: string[] = this.reflector?.getAllAndOverride<string[]>('claims', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!claims || !claims?.length) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    return claims.every((claim) => user.claims.includes(claim));
  }
}
