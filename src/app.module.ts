import { Module } from '@nestjs/common';

import { AuthModule } from './_features/auth/auth.module';
import { DbModule } from './_features/database/db.module';
import { UsersModule } from './_features/users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DbModule.forRoot({
      host: 'localhost',
      port: 5432,
      database: 'visa_db',
      user: 'postgres',
      password: '12345',
    }),
  ],
  providers: [],
})
export class AppModule {}
