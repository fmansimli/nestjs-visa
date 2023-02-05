import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@Inject('DB') private readonly pool: Pool) {}

  async find() {
    const query = 'SELECT * FROM users;';
    const resp = await this.pool.query(query);
    return resp.rows;
  }

  findById(id: number) {
    return { id };
  }

  create(user: Partial<User>) {
    return user;
  }

  update(id: number, attrs: Partial<User>) {
    return attrs;
  }

  delete(id: number) {
    return { id };
  }
}
