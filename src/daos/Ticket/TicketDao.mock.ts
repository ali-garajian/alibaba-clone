import { ITicketDao } from './TicketDao';
import MockDaoMock from '../MockDb/MockDao.mock';
import {
  IGetTicketListQueryParams,
  IGetTicketListResponse,
} from '@entities/Ticket';
import { IPassengers } from 'client/src/types/models/Ticket';

class TicketDao extends MockDaoMock implements ITicketDao {
  public async getTicketsListData(
    queries: IGetTicketListQueryParams
  ): Promise<IGetTicketListResponse> {
    const db = await super.openDb();
    const passengers = JSON.parse(queries.passengers) as IPassengers;
    const tickets = db.tickets.filter(
      (t) =>
        t.source.id === +queries.source &&
        t.destination.id === +queries.destination &&
        new Date(queries.departureDate).toDateString() ===
          new Date(t.departureDate).toDateString() &&
        t.quantity >= +passengers.adult + +passengers.child + +passengers.infant
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
