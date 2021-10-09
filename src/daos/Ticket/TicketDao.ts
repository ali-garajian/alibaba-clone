import {
	IGetClientTicketListQueryParams,
	IGetAdminTicketListQueryParams,
	GetAdminTicketListResponse,
	IDeleteTicketsRequest,
	CreateNewTicketRequest,
	ETicketCategory,
	CreateNewTicketResponse,
} from '@alibaba-clone/core';

import { FlightTicketQueryHandler } from './QueryHandlers/FlightTicketQueryHandler';
import { TrainTicketQueryHandler } from './QueryHandlers/TrainTicketQueryHandler';
import { BaseTicketQueryHandler } from './QueryHandlers/BaseTicketQueryHandler';
import { ITicketDao } from './base/ITicketDao';

export class TicketDao implements ITicketDao {
	createQueryHandler(type: ETicketCategory): BaseTicketQueryHandler {
		switch (type) {
			case ETicketCategory.Flight:
				return new FlightTicketQueryHandler();
			case ETicketCategory.Train:
				return new TrainTicketQueryHandler();
		}
	}

	async getTicketsAndDates(
		queries: IGetClientTicketListQueryParams,
		type: ETicketCategory
	) {
		const queryHandler = this.createQueryHandler(type);

		const tickets = await queryHandler.getClientTickets(queries);
		const dates = await queryHandler.getClientDates();

		return {
			tickets,
			dates,
		};
	}
	async getAllTickets(
		queries: IGetAdminTicketListQueryParams,
		type: ETicketCategory
	): Promise<GetAdminTicketListResponse> {
		const queryHandler = this.createQueryHandler(type);
		const tickets = await queryHandler.getAdminTickets(queries);
		return tickets;
	}
	async deleteTickets(
		req: IDeleteTicketsRequest,
		type: ETicketCategory
	): Promise<void> {
		const queryHandler = this.createQueryHandler(type);
		await queryHandler.deleteTickets(req);
	}
	async createTicket(
		req: CreateNewTicketRequest,
		type: ETicketCategory
	): Promise<CreateNewTicketResponse> {
		const queryHandler = this.createQueryHandler(type);
		const ticket = await queryHandler.createTicket(req);
		return ticket;
	}
}
