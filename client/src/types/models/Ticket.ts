import { IdTitleModel } from 'types/base/IdTitleModel';

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
export interface IPassengers {
  adult: number;
  child: number;
  infant: number;
}
export interface ITicket {
  id: string;
  ticketType: ETicketType;
  airline: {
    name: string;
    logo: string;
  };
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
export interface IDate {
  date: string;
  price: number;
}

// GET /tickets
export interface IGetTicketListQueryParams {
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
