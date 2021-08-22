import { ICityDao } from './CityDao';
import MockDaoMock from '../MockDb/MockDao.mock';
import { GetCitiesResponse, IGetCitiesQueryParams } from '@entities/City';

class CityDao extends MockDaoMock implements ICityDao {
  public async getAllCities(
    queries: IGetCitiesQueryParams
  ): Promise<GetCitiesResponse> {
    const db = await super.openDb();

    let cities = db.cities;
    if (queries.q?.trim()) {
      cities = cities.filter((city) => city.title.includes(queries.q!));
    }

    return cities;
  }
}

export default CityDao;
