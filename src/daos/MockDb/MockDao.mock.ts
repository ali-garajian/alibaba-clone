import jsonfile from 'jsonfile';
import { IUser } from '@entities/User';
import { IdTitleModel } from 'client/src/types/base/IdTitleModel';
import { IAirline } from 'client/src/types/models/Airline';
import { DbTicket } from '@models/Ticket';

interface IDatabase {
  users: IUser[];
  cities: IdTitleModel[];
  airlines: IAirline[];
  tickets: DbTicket[];
}

class MockDaoMock {
  private readonly dbFilePath = 'src/daos/MockDb/MockDb.json';

  protected openDb(): Promise<IDatabase> {
    return jsonfile.readFile(this.dbFilePath) as Promise<IDatabase>;
  }

  protected saveDb(db: IDatabase): Promise<void> {
    return jsonfile.writeFile(this.dbFilePath, db);
  }
}

export default MockDaoMock;
