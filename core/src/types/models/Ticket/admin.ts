import { IPaginatedRequest } from '../../base'
import {
    TicketTableRepresentation,
    CreateNewFlightTicketRequest,
    CreateNewTrainTicketRequest,
    DbTrainTicketModel,
    DbFlightTicketModel,
    FlightTicketTableRepresentation,
    TrainTicketTableRepresentation,
} from './base'

// GET /tickets/admin/:type
export interface IGetAdminTicketListQueryParams extends IPaginatedRequest {
    source?: number
    destination?: number
    departureDate?: string
}
export type GetAdminFlightTicketListResponse =
    Array<FlightTicketTableRepresentation>
export type GetAdminTrainTicketListResponse =
    Array<TrainTicketTableRepresentation>
export type GetAdminTicketListResponse =
    | GetAdminFlightTicketListResponse
    | GetAdminTrainTicketListResponse

// GET /ticktes/admin/:type
export interface IDeleteTicketsRequest {
    ids: number[]
}

// POST /tickets/admin/:type
export type CreateNewTicketRequest =
    | CreateNewFlightTicketRequest
    | CreateNewTrainTicketRequest
export type CreateNewFlightTicketResponse = DbFlightTicketModel
export type CreateNewTrainTicketResponse = DbTrainTicketModel
export type CreateNewTicketResponse =
    | CreateNewFlightTicketResponse
    | CreateNewTrainTicketResponse
