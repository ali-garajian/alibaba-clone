import { ITicket, IPassengers, IDate } from 'client/src/types/models/Ticket';

// GET /tickets
export interface IGetTicketListQueryParams {
  source: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: string;
}
export interface IGetTicketListResponse {
  dates: Array<IDate>;
  tickets: Array<ITicket>;
}
