import {
  IGetTicketListQueryParams,
  IGetTicketListResponse,
} from '@entities/Ticket';

export interface ITicketDao {
  getTicketsListData(
    queries: IGetTicketListQueryParams
  ): Promise<IGetTicketListResponse>;
}
