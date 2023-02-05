import { Body, Param, Get, Post, Patch, Delete } from '@nestjs/common';
import { NotFoundException, Controller } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.find();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    const user = this.usersService.findById(id);
    if (!user) throw new NotFoundException('user not found!');
    return user;
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Patch(':id')
  updateUser(@Param('id') id: number, user: UpdateUserDto) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
