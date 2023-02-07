export class Project {
  public id?: number;
  public name: string;
  public description: string;
  public requirements: string;
  public teamId: number;
  public doc: string;
  public createdAt: Date;
  public updatedAt: Date;
  public status: 'active' | 'deactive' | 'blocked' | 'pending';

  constructor(project: Partial<Project>) {
    Object.assign(this, project);
  }
}
