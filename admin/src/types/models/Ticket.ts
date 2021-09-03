import { IdTitleModel, IPaginatedRequest } from 'types/base';
import { IAirline } from './Airline';

export enum EFlightType {
  OneWay = 'one-way',
  TwoWay = 'two-way',
}
export enum ETicketType {
  Systematic = 'systematic',
  Charters = 'charters',
}
export enum EFlightClass {
  Buisiness = 'Buisiness',
  Economy = 'Economy',
}
export interface ITicket {
  id: string;
  ticketType: ETicketType;
  airline: IAirline;
  airplane: string;
  class: EFlightClass;
  source: IdTitleModel;
  departureDate: string;
  destination: IdTitleModel;
  arrivalDate: string;
  permittedLoggage: number;
  terminalNumber: number;
  price: number;
  quantity: number;
}

// GET /tickets/admin
export type TicketTableRepresentation = Pick<
  ITicket,
  'id' | 'airplane' | 'departureDate' | 'terminalNumber' | 'price' | 'quantity'
> &
  Record<'ticketType' | 'airline' | 'class' | 'source' | 'destination', string>;

export interface IGetTicketListQueryParams extends IPaginatedRequest {
  source?: number;
  destination?: number;
  departureDate?: string;
}
export type GetTicketListResponse = Array<TicketTableRepresentation>;

// GET /ticktes/admin
export interface IDeleteTicketsRequest {
  ids: string[];
}
