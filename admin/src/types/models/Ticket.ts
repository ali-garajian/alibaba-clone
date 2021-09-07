import { IdTitleModel, IPaginatedRequest } from 'types/base';
import { IAirline } from './Airline';
import { ComboEntry } from 'components/ComboBox';

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
  id: number;
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

export type AddTicketForm = Pick<
  ITicket,
  'airplane' | 'permittedLoggage' | 'terminalNumber' | 'price' | 'quantity'
> &
  Record<
    'ticketType' | 'airline' | 'class' | 'source' | 'destination',
    ComboEntry | null
  > &
  Record<'departureDate' | 'arrivalDate', Date>;

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
  ids: number[];
}

// POST /tickets/admin
export type CreateNewTicketRequest = Omit<
  ITicket,
  'id' | 'airline' | 'source' | 'destination'
> & {
  airlineId: number;
  sourceId: number;
  destinationId: number;
};
export type CreateNewTicketResponse = ITicket;
