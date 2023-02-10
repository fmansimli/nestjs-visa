import { Module } from '@nestjs/common';

import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

import { FilesModule } from '../files/files.module';

@Module({
  imports: [FilesModule],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
