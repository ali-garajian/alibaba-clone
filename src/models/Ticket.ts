import {
  IGetTicketListQueryParams as IClientQueryParams,
  IGetTicketListResponse as IClientResponse,
} from 'client/src/types/models/Ticket';
import {
  IGetTicketListQueryParams as IAdminQueryParams,
  GetTicketListResponse as AdminResponse,
  IDeleteTicketsRequest,
} from 'admin/src/types/models/Ticket';

// GET /tickets/client
export type GetClientTicketListQueryParams = IClientQueryParams;
export type GetClientTicketListResponse = IClientResponse;

// GET /tickets/admin
export type GetAdminTicketListQueryParams = IAdminQueryParams;
export type GetAdminTicketListResponse = AdminResponse;

// DELETE /tickets/admin
export type DeleteAdminTicketsQueryParams = IDeleteTicketsRequest;
