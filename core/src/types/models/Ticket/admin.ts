import { IPaginatedRequest } from '../../base'
import { ITicket } from './base'

// GET /tickets/admin
export type TicketTableRepresentation = Pick<
    ITicket,
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

export interface IGetAdminTicketListQueryParams extends IPaginatedRequest {
    source?: number
    destination?: number
    departureDate?: string
}
export type GetAdminTicketListResponse = Array<TicketTableRepresentation>

// GET /ticktes/admin
export interface IDeleteTicketsRequest {
    ids: number[]
}

// POST /tickets/admin
export type CreateNewTicketRequest = Omit<
    ITicket,
    'id' | 'airline' | 'source' | 'destination'
> & {
    airlineId: number
    sourceId: number
    destinationId: number
}
export type CreateNewTicketResponse = ITicket
