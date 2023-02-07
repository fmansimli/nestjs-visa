import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Controller, NotFoundException } from '@nestjs/common';

import { CreateTeamDto, UpdateTeamDto } from './dto';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  async getAll() {
    const teams = await this.teamsService.find();
    return teams;
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    const team = await this.teamsService.findById(id);
    if (!team) throw new NotFoundException('team not found!');
    return team;
  }

  @Post()
  async createTeam(@Body() team: CreateTeamDto) {
    return this.teamsService.create(team);
  }

  @Patch(':id')
  updateTeam(@Param('id') id: number, @Body() team: UpdateTeamDto) {
    return this.teamsService.update(id, team);
  }

  @Delete(':id')
  async deleteTeam(@Param('id') id: number) {
    const team = await this.teamsService.delete(id);
    if (!team) throw new NotFoundException('team not found!');
    return team;
  }
}
