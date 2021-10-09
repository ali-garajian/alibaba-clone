import {
	CreateNewTicketRequest,
	CreateNewTicketResponse,
	GetAdminTicketListResponse,
	IDate,
	IDeleteTicketsRequest,
	IGetAdminTicketListQueryParams,
	IGetClientTicketListQueryParams,
	Ticket,
} from '@alibaba-clone/core';

export interface IBaseClientTicketQueryHandler {
	getClientTickets(queries: IGetClientTicketListQueryParams): Promise<Ticket[]>;
	getClientDates(): Promise<IDate[]>;
}
export interface IBaseAdminTicketQueryHandler {
	getAdminTickets(
		queries: IGetAdminTicketListQueryParams
	): Promise<GetAdminTicketListResponse>;
	deleteTickets(req: IDeleteTicketsRequest): Promise<void>;
	createTicket(req: CreateNewTicketRequest): Promise<CreateNewTicketResponse>;
}

export type BaseTicketQueryHandler = IBaseClientTicketQueryHandler &
	IBaseAdminTicketQueryHandler;
