import { ApiService, ApiResponse } from './_base'
import {
    IGetAdminTicketListQueryParams,
    IDeleteTicketsRequest,
    IGetClientTicketListQueryParams,
    IGetClientTicketListResponse,
    ITrainTicket,
    EmptyResponse,
    GetAdminTrainTicketListResponse,
    CreateNewTrainTicketRequest,
    CreateNewTrainTicketResponse,
} from '../types'

export default class TrainTicketsApi extends ApiService {
    static async getClientTicketListData(
        params: IGetClientTicketListQueryParams
    ): ApiResponse<IGetClientTicketListResponse<ITrainTicket>> {
        return await this.axios.get('/tickets/client/train', { params })
    }

    static async getAdminTicketList(
        params: IGetAdminTicketListQueryParams
    ): ApiResponse<GetAdminTrainTicketListResponse> {
        return await this.axios.get('/tickets/admin/train', { params })
    }

    static async deleteTickets(
        req: IDeleteTicketsRequest
    ): ApiResponse<EmptyResponse> {
        return await this.axios.delete('/tickets/admin/train', { params: req })
    }

    static async createTicket(
        req: CreateNewTrainTicketRequest
    ): ApiResponse<CreateNewTrainTicketResponse> {
        return await this.axios.post('/tickets/admin/train', req)
    }
}
