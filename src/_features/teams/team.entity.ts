export class Team {
  public id: number;
  public name: string;
  public description: string;
  public leaderId: number;

  constructor(team: Partial<Team>) {
    Object.assign(this, team);
  }
}
