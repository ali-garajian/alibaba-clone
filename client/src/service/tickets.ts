import { ApiService, ApiResponse } from './_base';
import {
	IGetClientTicketListQueryParams,
	IGetClientTicketListResponse,
} from '@alibaba-clone/core';

export default class TicketsApi extends ApiService {
	static async getTicketListData(
		params: IGetClientTicketListQueryParams
	): ApiResponse<IGetClientTicketListResponse> {
		return await this.axios.get('/tickets/client', { params });
	}
}
