import {
  IGetTicketListQueryParams as IClientQueryParams,
  IGetTicketListResponse as IClientResponse,
} from 'client/src/types/models/Ticket';
import {
  IGetTicketListQueryParams as IAdminQueryParams,
  GetTicketListResponse as AdminResponse,
  IDeleteTicketsRequest,
  CreateNewTicketRequest,
  ITicket,
} from 'admin/src/types/models/Ticket';

export { ITicket };

export type DbTicket = Omit<ITicket, 'airline' | 'source' | 'destination'> & {
  airlineId: number;
  sourceId: number;
  destinationId: number;
};
export interface IRawDbITicket extends DbTicket {
  airlineName: string;
  airlineLogo: string;
  sourceTitle: string;
  destinationTitle: string;
}
export function convertToITicket(ticket: IRawDbITicket): ITicket {
  const {
    airlineId,
    airlineName,
    airlineLogo,
    sourceId,
    sourceTitle,
    destinationId,
    destinationTitle,
    ...rest
  } = ticket;

  return {
    ...rest,
    airline: {
      id: airlineId,
      name: airlineName,
      logo: airlineLogo,
    },
    source: {
      id: sourceId,
      title: sourceTitle,
    },
    destination: {
      id: destinationId,
      title: destinationTitle,
    },
  };
}

// GET /tickets/client
export type GetClientTicketListQueryParams = IClientQueryParams;
export type GetClientTicketListResponse = IClientResponse;

// GET /tickets/admin
export type GetAdminTicketListQueryParams = IAdminQueryParams;
export type GetAdminTicketListResponse = AdminResponse;

// DELETE /tickets/admin
export type DeleteAdminTicketsQueryParams = IDeleteTicketsRequest;

// POST /tickets/admin
export { CreateNewTicketRequest };
