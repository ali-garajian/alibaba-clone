import {
  GetClientTicketListQueryParams,
  GetClientTicketListResponse,
  GetAdminTicketListQueryParams,
  GetAdminTicketListResponse,
  DeleteAdminTicketsQueryParams,
} from '@models/Ticket';

export interface ITicketDao {
  getTicketsAndDates(
    queries: GetClientTicketListQueryParams
  ): Promise<GetClientTicketListResponse>;

  getAllTickets(
    queries: GetAdminTicketListQueryParams
  ): Promise<GetAdminTicketListResponse>;

  deleteTickets(req: DeleteAdminTicketsQueryParams): Promise<void>;
}
