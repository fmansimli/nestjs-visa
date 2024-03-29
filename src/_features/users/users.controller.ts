import { NotFoundException, UseGuards } from '@nestjs/common';
import { Body, Param, Get, Post, Patch, Delete, Controller } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { JwtGuard } from 'src/guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getAll() {
    const users = await this.usersService.find();
    return users;
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    const user = await this.usersService.findById(id);
    if (!user) throw new NotFoundException('user not found!');
    return user;
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() user: UpdateUserDto) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    const user = await this.usersService.delete(id);
    if (!user) throw new NotFoundException('user not found!');
    return user;
  }
}
