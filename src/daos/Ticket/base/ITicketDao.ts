import {
	ETicketCategory,
	IGetClientTicketListQueryParams,
	IGetClientTicketListResponse,
	IGetAdminTicketListQueryParams,
	GetAdminTicketListResponse,
	IDeleteTicketsRequest,
	CreateNewTicketRequest,
	CreateNewTicketResponse,
} from '@alibaba-clone/core';

export interface ITicketDao {
	getTicketsAndDates(
		queries: IGetClientTicketListQueryParams,
		type: ETicketCategory
	): Promise<IGetClientTicketListResponse>;
	getAllTickets(
		queries: IGetAdminTicketListQueryParams,
		type: ETicketCategory
	): Promise<GetAdminTicketListResponse>;
	deleteTickets(
		req: IDeleteTicketsRequest,
		type: ETicketCategory
	): Promise<void>;
	createTicket(
		req: CreateNewTicketRequest,
		type: ETicketCategory
	): Promise<CreateNewTicketResponse>;
}
