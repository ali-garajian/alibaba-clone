import { IUser } from '@entities/User';
import connection, { query } from '../db';

export interface IUserDao {
  getOne: (email: string) => Promise<IUser | null>;
  getAll: () => Promise<IUser[]>;
  add: (user: IUser) => Promise<void>;
  update: (user: IUser) => Promise<void>;
  delete: (id: number) => Promise<void>;
}

class UserDao implements IUserDao {
  public async getOne(email: string): Promise<IUser | null> {
    const result = await query<IUser[]>(
      connection,
      `
        SELECT * from tbl_users WHERE email = ?
      `,
      email
    );

    return result[0];
  }

  public getAll(): Promise<IUser[]> {
    // TODO
    return Promise.resolve([]);
  }

  public async add(user: Omit<IUser, 'id'>): Promise<void> {
    await query<IUser[]>(
      connection,
      `
          INSERT INTO tbl_users SET ?
        `,
      user
    );
  }

  public async update(user: IUser): Promise<void> {
    // TODO
    return Promise.resolve(undefined);
  }

  public async delete(id: number): Promise<void> {
    // TODO
    return Promise.resolve(undefined);
  }
}

export default UserDao;
