import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(attrs: LoginDto) {
    const user = await this.usersService.findByEmail(attrs.email);
    if (!user) return null;

    const { id, email } = user;

    const accessToken = this.jwtService.sign({ id, email, claims: ['all'] });

    return { auth: { accessToken }, user };
  }

  register(attrs: RegisterDto) {
    return attrs;
  }
}
