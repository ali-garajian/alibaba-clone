import jsonfile from 'jsonfile';
import { IUser } from '@entities/User';
import { IdTitleModel, IAirline, DbTicketModel } from '@alibaba-clone/core';

interface IDatabase {
	users: IUser[];
	cities: IdTitleModel[];
	airlines: IAirline[];
	tickets: DbTicketModel[];
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
