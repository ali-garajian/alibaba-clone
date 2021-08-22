import { ApiService, ApiResponse } from './_base';
import { IGetCitiesQueryParams, GetCitiesResponse } from 'types/models/City';

export default class CitiesApi extends ApiService {
  static async getCities(
    params: IGetCitiesQueryParams
  ): ApiResponse<GetCitiesResponse> {
    return await this.axios.get('/cities', { params });
  }
}
