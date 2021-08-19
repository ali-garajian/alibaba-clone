import {
  ITicket,
  ETicketType,
  IPassengers,
} from 'client/src/types/models/Ticket';

// Base Models
export interface IDate {
  date: Date;
  price: number;
}

// GET /tickets
export interface IGetTicketListQueryParams {
  flightType: ETicketType;
  source: number;
  destination: number;
  departureDate: string;
  returnDate?: string;
  passengers: IPassengers;
}
export interface IGetTicketListResponse {
  dates: Array<IDate>;
  tickets: Array<ITicket>;
}
