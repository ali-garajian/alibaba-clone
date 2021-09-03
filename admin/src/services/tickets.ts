import { ApiService, ApiResponse } from './_base';
import {
  IGetTicketListQueryParams,
  GetTicketListResponse,
  IDeleteTicketsRequest,
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
}
