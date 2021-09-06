import { IAirlineDao } from './AirlineDao';
import MockDaoMock from '../MockDb/MockDao.mock';
import { GetAdminAirlinesResponse } from '@models/Airline';

class AirlineDao extends MockDaoMock implements IAirlineDao {
  public async getAirlinesAsOptions(): Promise<GetAdminAirlinesResponse> {
    const db = await super.openDb();

    return db.airlines.map((a) => ({
      id: a.id,
      title: a.name,
    }));
  }
}

export default AirlineDao;
