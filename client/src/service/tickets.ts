import { ApiService, ApiResponse } from './_base';
import {
  IGetTicketListQueryParams,
  IGetTicketListResponse,
} from 'types/models/Ticket';

export default class TicketsApi extends ApiService {
  static async getTicketListData(
    params: IGetTicketListQueryParams
  ): ApiResponse<IGetTicketListResponse> {
    return await this.axios.get('/tickets/client', { params });
  }
}
