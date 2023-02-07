import { SetMetadata } from '@nestjs/common';

export const Permissions = (claim: string) => SetMetadata('claim', claim);
