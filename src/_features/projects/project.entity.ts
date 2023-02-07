export class Project {
  public id: number;
  public name: string;

  constructor(project: Partial<Project>) {
    Object.assign(project);
  }
}
