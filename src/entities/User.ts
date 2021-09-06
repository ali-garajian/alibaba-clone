export enum EUserRoles {
  Standard = 'standard',
  Admin = 'admin',
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  pwdHash: string;
  role: EUserRoles;
}

export class User implements IUser {
  public id: number;
  public name: string;
  public email: string;
  public role: EUserRoles;
  public pwdHash: string;

  constructor(
    nameOrUser?: string | IUser,
    email?: string,
    role?: EUserRoles,
    pwdHash?: string,
    id?: number
  ) {
    if (typeof nameOrUser === 'string' || typeof nameOrUser === 'undefined') {
      this.name = nameOrUser || '';
      this.email = email || '';
      this.role = role || EUserRoles.Standard;
      this.pwdHash = pwdHash || '';
      this.id = id || -1;
    } else {
      this.name = nameOrUser.name;
      this.email = nameOrUser.email;
      this.role = nameOrUser.role;
      this.pwdHash = nameOrUser.pwdHash;
      this.id = nameOrUser.id;
    }
  }
}
