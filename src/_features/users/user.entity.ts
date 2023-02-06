export class User {
  public id?: number;
  public firstname: string;
  public lastname: string;
  public email: string;
  public username: string;
  public password: string;
  public bio: string;
  public createdAt: Date;
  public updatedAt: Date;
  public managerId: number;
  public status: 'active' | 'deactive' | 'blocked' | 'pending';

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }

  static new(item: any) {
    return item;
  }
}
