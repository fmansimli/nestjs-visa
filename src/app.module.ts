import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { DbModule } from './_features/database/db.module';
import { AuthModule } from './_features/auth/auth.module';
import { ProjectsModule } from './_features/projects/projects.module';
import { UsersModule } from './_features/users/users.module';
import { TeamsModule } from './_features/teams/teams.module';

import { FileProtectMiddleware } from './middlewares/file-protect.middleware';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProjectsModule,
    TeamsModule,
    DbModule.forRoot({
      host: 'localhost',
      port: 5432,
      database: 'visa_db',
      user: 'postgres',
      password: '12345',
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FileProtectMiddleware).forRoutes('*');
  }
}
