import { ITicketDao } from './TicketDao';
import MockDaoMock from '../MockDb/MockDao.mock';
import {
  IGetTicketListQueryParams,
  IGetTicketListResponse,
} from '@entities/Ticket';

class TicketDao extends MockDaoMock implements ITicketDao {
  public async getTicketsListData(
    queries: IGetTicketListQueryParams
  ): Promise<IGetTicketListResponse> {
    const db = await super.openDb();

    const tickets = db.tickets.filter(
      (t) =>
        t.source.id === +queries.source &&
        t.destination.id === +queries.destination &&
        queries.departureDate === t.departureDate &&
        t.quantity >=
          +queries.passengers.adult +
            +queries.passengers.child +
            +queries.passengers.infant
    );

    const dates: IGetTicketListResponse['dates'] = Array.from(
      { length: 21 },
      (_, i) => i
    ).map((index) => {
      const date = new Date(Date.now() + index * 24 * 3600 * 1000);
      const dateTickets = db.tickets.filter(
        (i) => new Date(i.departureDate).toDateString() === date.toDateString()
      );
      let lowestPrice = dateTickets?.[0].price;
      dateTickets.forEach((t) => {
        if (t.price < lowestPrice) lowestPrice = t.price;
      });

      return {
        date,
        price: lowestPrice,
      };
    });

    return {
      tickets,
      dates,
    };
  }
}

export default TicketDao;
