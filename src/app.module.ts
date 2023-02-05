import { Module } from '@nestjs/common';

import { AuthModule } from './_features/auth/auth.module';
import { UsersModule } from './_features/users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  providers: [],
})
export class AppModule {}
