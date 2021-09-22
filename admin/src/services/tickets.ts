import { ApiService, ApiResponse } from './_base';
import {
	IGetAdminTicketListQueryParams,
	GetAdminTicketListResponse,
	IDeleteTicketsRequest,
	CreateNewTicketRequest,
	CreateNewTicketResponse,
} from '@alibaba-clone/core';

export default class TicketsApi extends ApiService {
	static async getTicketList(
		params: IGetAdminTicketListQueryParams
	): ApiResponse<GetAdminTicketListResponse> {
		return await this.axios.get('/tickets/admin', { params });
	}

	static async deleteTickets(req: IDeleteTicketsRequest): ApiResponse<{}> {
		return await this.axios.delete('/tickets/admin', { params: req });
	}

	static async createTicket(
		req: CreateNewTicketRequest
	): ApiResponse<CreateNewTicketResponse> {
		return await this.axios.post('/tickets/admin', req);
	}
}
