import { IGetCitiesQueryParams, GetCitiesResponse } from '@alibaba-clone/core';
import { ApiService, ApiResponse } from './_base';

export default class CitiesApi extends ApiService {
	static async getCities(
		params: IGetCitiesQueryParams
	): ApiResponse<GetCitiesResponse> {
		return await this.axios.get('/cities', { params });
	}
}
