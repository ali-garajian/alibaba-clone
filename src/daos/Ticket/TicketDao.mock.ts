import { ITicketDao } from './TicketDao';
import MockDaoMock from '../MockDb/MockDao.mock';
import { EFlightClass, ETicketType } from 'client/src/types/models/Ticket';
import {
  GetClientTicketListQueryParams,
  GetClientTicketListResponse,
  GetAdminTicketListQueryParams,
  GetAdminTicketListResponse,
  DeleteAdminTicketsQueryParams,
} from '@models/Ticket';

class TicketDao extends MockDaoMock implements ITicketDao {
  public async getTicketsAndDates(
    queries: GetClientTicketListQueryParams
  ): Promise<GetClientTicketListResponse> {
    const db = await super.openDb();
    const passengers = queries.passengers;

    const tickets = db.tickets.filter(
      (t) =>
        t.source.id === +queries.source &&
        t.destination.id === +queries.destination &&
        new Date(queries.departureDate).toDateString() ===
          new Date(t.departureDate).toDateString() &&
        t.quantity >= +passengers.adult + +passengers.child + +passengers.infant
    );

    const dates: GetClientTicketListResponse['dates'] = Array.from(
      { length: 21 },
      (_, i) => i
    ).map((index) => {
      const date = new Date(
        new Date('2021-08-20T11:44:14.274Z').getTime() +
          index * 24 * 3600 * 1000
      );
      const dateTickets = db.tickets.filter(
        (i) => new Date(i.departureDate).toDateString() === date.toDateString()
      );
      let lowestPrice = dateTickets?.[0]?.price;
      dateTickets.forEach((t) => {
        if (t.price < lowestPrice) lowestPrice = t.price;
      });

      return {
        date: date.toISOString(),
        price: lowestPrice,
      };
    });

    return {
      tickets,
      dates,
    };
  }

  public async getAllTickets(
    queries: GetAdminTicketListQueryParams
  ): Promise<GetAdminTicketListResponse> {
    const db = await super.openDb();
    const tickets = db.tickets.filter((t) =>
      queries.source
        ? t.source.id === +queries.source
        : true && queries.destination
        ? t.destination.id === +queries.destination
        : true && queries.departureDate
        ? new Date(queries.departureDate).toDateString() ===
          new Date(t.departureDate).toDateString()
        : true
    );

    return tickets.map((ticket, index) => ({
      ...ticket,
      ticketType:
        ticket.ticketType === ETicketType.Charters ? 'چارتر' : 'سیستمی',
      airline: ticket.airline.name,
      class: ticket.class === EFlightClass.Buisiness ? 'بیزینس' : 'اکونومی',
      source: ticket.source.title,
      destination: ticket.destination.title,
      price: ticket.price * 1000,
    }));
  }

  public async deleteTickets({ ids }: DeleteAdminTicketsQueryParams) {
    const db = await super.openDb();
    const filteredTickets = db.tickets.filter((t) => !ids.includes(t.id));

    await super.saveDb({
      ...db,
      tickets: filteredTickets,
    });
  }
}

export default TicketDao;
