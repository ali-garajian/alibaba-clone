import { ApiService, ApiResponse } from './_base';
import { GetAirlinesResponse } from '@alibaba-clone/core';

export default class AirlineApi extends ApiService {
	static async getAirlines(): ApiResponse<GetAirlinesResponse> {
		return await this.axios.get('/airlines/admin');
	}
}
