import { Inject, Injectable } from '@nestjs/common';
import { Team } from './team.entity';

import { Pool } from 'pg';

@Injectable()
export class TeamsService {
  constructor(@Inject('DB') private readonly pool: Pool) {}

  async find(): Promise<Team[]> {
    const query = 'SELECT * FROM teams ORDER BY id DESC;';
    const resp = await this.pool.query(query);

    const teams = resp.rows.map((item) => new Team(item));

    return teams;
  }

  async findById(id: number) {
    const query = 'SELECT * FROM teams WHERE id=$1;';
    const resp = await this.pool.query(query, [id]);
    if (resp.rows.length) {
      return new Team(resp.rows[0]);
    }
    return null;
  }

  async findByEmail(email: string) {
    const query = 'SELECT * FROM teams WHERE email=$1;';
    const resp = await this.pool.query(query, [email]);
    if (resp.rows.length) {
      return new Team(resp.rows[0]);
    }
    return null;
  }

  async create(team: Partial<Team>) {
    console.log(team);

    const query =
      'INSERT INTO teams(name, description,"leaderId") VALUES($1,$2,$3) returning *;';
    const result = await this.pool.query(query, [
      team.name,
      team.description,
      team.leaderId,
    ]);
    return new Team(result.rows[0]);
  }

  async update(id: number, attrs: Partial<Team>): Promise<any> {
    let query = 'UPDATE teams SET ';

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

    return new Team(resp.rows[0]);
  }

  async delete(id: number) {
    const query = 'DELETE FROM teams WHERE id=$1 returning *;';
    const resp = await this.pool.query(query, [id]);
    if (resp.rows.length) {
      return new Team(resp.rows[0]);
    }
    return null;
  }
}
