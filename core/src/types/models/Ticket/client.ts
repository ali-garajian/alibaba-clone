import { IPassengers, IDate, Ticket } from './base'

// GET /tickets/:type
export interface IGetClientTicketListQueryParams {
    source: number
    destination: number
    departureDate: string
    returnDate?: string
    passengers: IPassengers
}
export interface IGetClientTicketListResponse<
    TicketType extends Ticket = Ticket
> {
    dates: Array<IDate>
    tickets: Array<TicketType>
}
