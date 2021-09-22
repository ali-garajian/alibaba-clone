import { IGetCitiesQueryParams, GetCitiesResponse } from '@alibaba-clone/core';

export interface ICityDao {
	getAllCities(queries: IGetCitiesQueryParams): Promise<GetCitiesResponse>;
}
