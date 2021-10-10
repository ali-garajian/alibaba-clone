import { ApiService, ApiResponse } from './_base'
import {
    IGetAdminTicketListQueryParams,
    IDeleteTicketsRequest,
    IGetClientTicketListQueryParams,
    IGetClientTicketListResponse,
    IFlightTicket,
    GetAdminFlightTicketListResponse,
    EmptyResponse,
    CreateNewFlightTicketResponse,
    CreateNewFlightTicketRequest,
} from '../types'

export default class FlightTicketsApi extends ApiService {
    static async getClientTicketListData(
        params: IGetClientTicketListQueryParams
    ): ApiResponse<IGetClientTicketListResponse<IFlightTicket>> {
        return await this.axios.get('/tickets/client/flight', { params })
    }

    static async getAdminTicketList(
        params: IGetAdminTicketListQueryParams
    ): ApiResponse<GetAdminFlightTicketListResponse> {
        return await this.axios.get('/tickets/admin/flight', { params })
    }

    static async deleteTickets(
        req: IDeleteTicketsRequest
    ): ApiResponse<EmptyResponse> {
        return await this.axios.delete('/tickets/admin/flight', { params: req })
    }

    static async createTicket(
        req: CreateNewFlightTicketRequest
    ): ApiResponse<CreateNewFlightTicketResponse> {
        return await this.axios.post('/tickets/admin/flight', req)
    }
}
