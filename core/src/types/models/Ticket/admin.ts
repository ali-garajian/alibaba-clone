import { IPaginatedRequest } from '../../base'
import {
    TicketTableRepresentation,
    CreateNewFlightTicketRequest,
    CreateNewTrainTicketRequest,
    DbTrainTicketModel,
    DbFlightTicketModel,
} from './base'

// GET /tickets/admin/:type
export interface IGetAdminTicketListQueryParams extends IPaginatedRequest {
    source?: number
    destination?: number
    departureDate?: string
}
export type GetAdminTicketListResponse = Array<TicketTableRepresentation>

// GET /ticktes/admin/:type
export interface IDeleteTicketsRequest {
    ids: number[]
}

// POST /tickets/admin/:type
export type CreateNewTicketRequest =
    | CreateNewFlightTicketRequest
    | CreateNewTrainTicketRequest
export type CreateNewTicketResponse = DbFlightTicketModel | DbTrainTicketModel
