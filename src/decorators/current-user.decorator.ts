import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrenUser = createParamDecorator((_data: never, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user || null;
});
