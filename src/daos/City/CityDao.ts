import { IGetCitiesQueryParams, GetCitiesResponse } from '@entities/City';

export interface ICityDao {
  getAllCities(queries: IGetCitiesQueryParams): Promise<GetCitiesResponse>;
}
