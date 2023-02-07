import { Inject, Injectable } from '@nestjs/common';
import { Project } from './project.entity';

import { Pool } from 'pg';

@Injectable()
export class ProjectsService {
  constructor(@Inject('DB') private readonly pool: Pool) {}

  async find(): Promise<Project[]> {
    const query = 'SELECT * FROM projects ORDER BY id DESC;';
    const resp = await this.pool.query(query);

    const projects = resp.rows.map((item) => new Project(item));
    return projects;
  }

  async findById(id: number) {
    const query = 'SELECT * FROM projects WHERE id=$1;';
    const resp = await this.pool.query(query, [id]);
    if (resp.rows.length) {
      return new Project(resp.rows[0]);
    }
    return null;
  }

  async create(project: Partial<Project>) {
    const query =
      'INSERT INTO projects(name,description,requirements,"teamId",doc) VALUES($1,$2,$3,$4,$5) returning *;';
    const result = await this.pool.query(query, [
      project.name,
      project.description,
      project.requirements,
      project.teamId,
      project.doc,
    ]);

    return new Project(result.rows[0]);
  }

  async update(id: number, attrs: Partial<Project>): Promise<any> {
    let query = 'UPDATE projects SET ';

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

    return new Project(resp.rows[0]);
  }

  async delete(id: number) {
    const query = 'DELETE FROM projects WHERE id=$1 returning *;';
    const resp = await this.pool.query(query, [id]);
    if (resp.rows.length) {
      return new Project(resp.rows[0]);
    }
    return null;
  }
}
