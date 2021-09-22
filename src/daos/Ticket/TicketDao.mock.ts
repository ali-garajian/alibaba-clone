import { ITicketDao } from './TicketDao';
import MockDaoMock from '../MockDb/MockDao.mock';
import {
	EFlightClass,
	ETicketType,
	ITicket,
	IGetClientTicketListQueryParams,
	IGetClientTicketListResponse,
	IGetAdminTicketListQueryParams,
	GetAdminTicketListResponse,
	IDeleteTicketsRequest,
	CreateNewTicketRequest,
} from '@alibaba-clone/core';
import { DbTicket } from '@models/Ticket';

class TicketDao extends MockDaoMock implements ITicketDao {
	public async getTicketsAndDates(
		queries: IGetClientTicketListQueryParams
	): Promise<IGetClientTicketListResponse> {
		const db = await super.openDb();
		const passengers = queries.passengers;

		const tickets: ITicket[] = db.tickets
			.filter(
				(t) =>
					t.sourceId === +queries.source &&
					t.destinationId === +queries.destination &&
					new Date(queries.departureDate).toDateString() ===
						new Date(t.departureDate).toDateString() &&
					t.quantity >=
						+passengers.adult + +passengers.child + +passengers.infant
			)
			.map((t) => ({
				...t,
				airline: db.airlines.find((i) => i.id === t.airlineId)!,
				source: db.cities.find((i) => i.id === t.sourceId)!,
				destination: db.cities.find((i) => i.id === t.destinationId)!,
			}));

		const dates: IGetClientTicketListResponse['dates'] = Array.from(
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
		queries: IGetAdminTicketListQueryParams
	): Promise<GetAdminTicketListResponse> {
		const db = await super.openDb();
		const tickets = db.tickets.filter((t) =>
			queries.source
				? t.sourceId === +queries.source
				: true && queries.destination
				? t.destinationId === +queries.destination
				: true && queries.departureDate
				? new Date(queries.departureDate).toDateString() ===
				  new Date(t.departureDate).toDateString()
				: true
		);

		return tickets.map((ticket) => ({
			...ticket,
			ticketType:
				ticket.ticketType === ETicketType.Charters ? 'چارتر' : 'سیستمی',
			airline: db.airlines.find((i) => i.id === ticket.airlineId)!.name,
			class: ticket.class === EFlightClass.Buisiness ? 'بیزینس' : 'اکونومی',
			source: db.cities.find((i) => i.id === ticket.sourceId)!.title,
			destination: db.cities.find((i) => i.id === ticket.destinationId)!.title,
			price: ticket.price * 1000,
		}));
	}

	public async deleteTickets({ ids }: IDeleteTicketsRequest) {
		const db = await super.openDb();
		const filteredTickets = db.tickets.filter((t) => !ids.includes(t.id));

		await super.saveDb({
			...db,
			tickets: filteredTickets,
		});
	}

	public async createTicket(req: CreateNewTicketRequest) {
		const db = await super.openDb();
		const newTicket: DbTicket = {
			id: Math.round(Math.random() * 1_000_000),
			...req,
		};
		const tickets = db.tickets;
		tickets.unshift(newTicket);

		await super.saveDb({
			...db,
			tickets,
		});

		return newTicket;
	}
}

export default TicketDao;
