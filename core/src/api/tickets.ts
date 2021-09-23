import { ApiService, ApiResponse } from './_base'
import {
    IGetAdminTicketListQueryParams,
    GetAdminTicketListResponse,
    IDeleteTicketsRequest,
    CreateNewTicketRequest,
    CreateNewTicketResponse,
    IGetClientTicketListQueryParams,
    IGetClientTicketListResponse,
} from '../types'

export default class TicketsApi extends ApiService {
    static async getClientTicketListData(
        params: IGetClientTicketListQueryParams
    ): ApiResponse<IGetClientTicketListResponse> {
        return await this.axios.get('/tickets/client', { params })
    }

    static async getAdminTicketList(
        params: IGetAdminTicketListQueryParams
    ): ApiResponse<GetAdminTicketListResponse> {
        return await this.axios.get('/tickets/admin', { params })
    }

    static async deleteTickets(
        req: IDeleteTicketsRequest
    ): ApiResponse<Record<string, unknown>> {
        return await this.axios.delete('/tickets/admin', { params: req })
    }

    static async createTicket(
        req: CreateNewTicketRequest
    ): ApiResponse<CreateNewTicketResponse> {
        return await this.axios.post('/tickets/admin', req)
    }
}
