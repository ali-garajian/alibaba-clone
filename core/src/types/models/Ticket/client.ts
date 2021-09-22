import { IPassengers, IDate, ITicket } from './_base'

// GET /tickets
export interface IGetClientTicketListQueryParams {
    source: number
    destination: number
    departureDate: string
    returnDate?: string
    passengers: IPassengers
}
export interface IGetClientTicketListResponse {
    dates: Array<IDate>
    tickets: Array<ITicket>
}
