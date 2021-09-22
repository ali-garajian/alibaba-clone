import { IdTitleModel } from '../../base'
import { IAirline } from '../Airline'

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
    adult: number
    child: number
    infant: number
}
export interface ITicket {
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
export interface IDate {
    date: string
    price: number
}
