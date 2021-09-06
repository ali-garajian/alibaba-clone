import {
  GetClientTicketListQueryParams,
  GetClientTicketListResponse,
  GetAdminTicketListQueryParams,
  GetAdminTicketListResponse,
  DeleteAdminTicketsQueryParams,
  CreateNewTicketRequest,
  DbTicket,
} from '@models/Ticket';

export interface ITicketDao {
  getTicketsAndDates(
    queries: GetClientTicketListQueryParams
  ): Promise<GetClientTicketListResponse>;

  getAllTickets(
    queries: GetAdminTicketListQueryParams
  ): Promise<GetAdminTicketListResponse>;

  deleteTickets(req: DeleteAdminTicketsQueryParams): Promise<void>;
  createTicket(req: CreateNewTicketRequest): Promise<DbTicket>;
}
