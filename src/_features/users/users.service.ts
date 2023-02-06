import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@Inject('DB') private readonly pool: Pool) {}

  async find(): Promise<User[]> {
    const query = 'SELECT * FROM users ORDER BY id DESC;';
    const resp = await this.pool.query(query);

    const users = resp.rows.map((item) => new User(item));

    return users;
  }

  async findById(id: number) {
    const query = 'SELECT * FROM users WHERE id=$1;';
    const resp = await this.pool.query(query, [id]);
    return new User(resp.rows[0]);
  }

  async create(user: Partial<User>) {
    const query = 'INSERT INTO users(email, password) VALUES($1,$2) returning *;';
    const result = await this.pool.query(query, [user.email, user.password]);
    return new User(result.rows[0]);
  }

  async update(id: number, attrs: Partial<User>): Promise<any> {
    let query = 'UPDATE users SET ';

    let piece = '';
    let index = 1;
    const props = [];

    for (const prop in attrs) {
      piece += `${prop}=$${index},`;
      props.push(attrs[prop]);
      index += 1;
    }

    query += piece.slice(0, -1) + ` WHERE id=$${index} returning *;`;

    const resp = await this.pool.query(query, [...props, id]);

    return new User(resp.rows[0]);
  }

  async delete(id: number) {
    const query = 'DELETE FROM users WHERE id=$1 returning *;';
    const resp = await this.pool.query(query, [id]);
    if (resp.rows.length) {
      return new User(resp.rows[0]);
    }
    return null;
  }
}
