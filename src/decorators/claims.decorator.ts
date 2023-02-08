import { SetMetadata } from '@nestjs/common';

export const RequirePermissions = (...claims: string[]) => SetMetadata('claims', claims);
