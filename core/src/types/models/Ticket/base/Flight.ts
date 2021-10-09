import { IdTitleModel } from '../../../base'
import { IAirline } from '../../Airline'

export enum ETicketType {
    Systematic = 'systematic',
    Charters = 'charters',
}
export enum EFlightClass {
    Buisiness = 'Buisiness',
    Economy = 'Economy',
}

export interface IFlightTicket {
    id: number
    ticketType: ETicketType
    airline: IAirline
    airplane: string
    class: EFlightClass
    source: IdTitleModel
    departureDate: string
    destination: IdTitleModel
    arrivalDate: string
    permittedLoggage: number
    terminalNumber: number
    price: number
    quantity: number
}

export type FlightTicketTableRepresentation = Pick<
    IFlightTicket,
    | 'id'
    | 'airplane'
    | 'departureDate'
    | 'terminalNumber'
    | 'price'
    | 'quantity'
> &
    Record<
        'ticketType' | 'airline' | 'class' | 'source' | 'destination',
        string
    >

export type CreateNewFlightTicketRequest = Omit<
    IFlightTicket,
    'id' | 'airline' | 'source' | 'destination'
> & {
    airlineId: number
    sourceId: number
    destinationId: number
}

export type DbFlightTicketModel = Omit<
    IFlightTicket,
    'airline' | 'source' | 'destination'
> & {
    airlineId: number
    sourceId: number
    destinationId: number
}
