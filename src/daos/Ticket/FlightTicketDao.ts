import { DbTicket, convertToITicket, IRawDbITicket } from '@models/Ticket';
import {
	IDate,
	IGetClientTicketListQueryParams,
	IGetClientTicketListResponse,
	IGetAdminTicketListQueryParams,
	GetAdminTicketListResponse,
	IDeleteTicketsRequest,
	CreateNewTicketRequest,
	TicketTableRepresentation,
	ICommonTicketRoutePathParams,
	ETicketCategory,
} from '@alibaba-clone/core';

import connection, { query } from '../db';
import { BaseTicketQueryHandler } from './utils/base';
import { FlightTicketQueryHandler } from './utils/FlightTicketQueryHandler';

export class TicketDao implements ITicketDao {
	queryHandlers: Record<ETicketCategory, BaseTicketQueryHandler> = {
		[ETicketCategory.Flight]: new FlightTicketQueryHandler(),
		[ETicketCategory.Train]: new FlightTicketQueryHandler(),
	};

	async getTicketsAndDates(
		queries: IGetClientTicketListQueryParams,
		params: ICommonTicketRoutePathParams
	): Promise<IGetClientTicketListResponse> {
		const { tickets, dates } = await this.queryHandlers[
			params.type
		].getTicketsAndDates(queries, params);

		return {
			tickets: tickets.map(convertToITicket),
			dates,
		};
	}
	async getAllTickets(
		queries: IGetAdminTicketListQueryParams
	): Promise<GetAdminTicketListResponse> {
		/* 
			TODO: 
				1)add pagination 
				2)move queries into stored procedures & call those instead 
				3)add types for tickets
		*/
		const tickets = await query<TicketTableRepresentation[]>(
			connection,
			`
      SELECT 
        tbl_tickets.id,
        tbl_airlines.name as airline,
        tbl_cities_source.title as source,
        tbl_cities_dest.title as destination,
        if(tbl_tickets.ticketType = 'charters', 'چارتر', 'سیستمی') as ticketType,
        tbl_tickets.airplane,
        if(tbl_tickets.class = 'Economy', 'اکونومی', 'بیزینس') as class,
        tbl_tickets.arrivalDate,
        tbl_tickets.departureDate,
        tbl_tickets.permittedLoggage,
        tbl_tickets.terminalNumber,
        tbl_tickets.price,
        tbl_tickets.quantity
          FROM
              tbl_tickets
                  INNER JOIN
              tbl_airlines ON tbl_tickets.airlineId = tbl_airlines.id
                  INNER JOIN
              tbl_cities AS tbl_cities_source ON tbl_tickets.sourceId = tbl_cities_source.id
                  INNER JOIN
              tbl_cities AS tbl_cities_dest ON tbl_tickets.destinationId = tbl_cities_dest.id
          ${
						queries.source || queries.destination || queries.departureDate
							? 'WHERE'
							: ''
					}
              ${queries.source ? 'sourceId = ? AND' : ''} 
              ${queries.destination ? 'destinationId = ? AND' : ''} 
              ${
								queries.departureDate
									? `DATE_FORMAT(departureDate, '%Y-%m-%d') = ?`
									: ''
							}
      `,
			[
				queries.source,
				queries.destination,
				queries.departureDate
					? new Date(queries.departureDate).toISOString().substr(0, 10)
					: null,
			].filter(Boolean)
		);

		return tickets;
	}
	async deleteTickets(req: IDeleteTicketsRequest): Promise<void> {
		await query<any>(
			connection,
			`
      DELETE FROM tbl_tickets 
      WHERE id = ?  
      `,
			req.ids.map((i) => +i)
		);
	}
	async createTicket(req: CreateNewTicketRequest): Promise<DbTicket> {
		const result = await query<any>(
			connection,
			`INSERT INTO tbl_tickets set ?`,
			req
		);

		return {
			...req,
			id: result.insertId,
		};
	}
}
