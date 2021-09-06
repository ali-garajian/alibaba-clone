import { ApiService, ApiResponse } from './_base';
import {
  IGetTicketListQueryParams,
  GetTicketListResponse,
  IDeleteTicketsRequest,
  CreateNewTicketRequest,
  CreateNewTicketResponse,
} from 'types/models/Ticket';

export default class TicketsApi extends ApiService {
  static async getTicketList(
    params: IGetTicketListQueryParams
  ): ApiResponse<GetTicketListResponse> {
    return await this.axios.get('/tickets/admin', { params });
  }

  static async deleteTickets(req: IDeleteTicketsRequest): ApiResponse<{}> {
    return await this.axios.delete('/tickets/admin', { params: req });
  }

  static async createTicket(
    req: CreateNewTicketRequest
  ): ApiResponse<CreateNewTicketResponse> {
    return await this.axios.post('/tickets/admin', req);
  }
}
