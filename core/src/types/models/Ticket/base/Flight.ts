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
