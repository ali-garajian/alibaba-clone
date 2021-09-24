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
} from '@alibaba-clone/core';

import connection, { query } from '../db';

export interface ITicketDao {
	getTicketsAndDates(
		queries: IGetClientTicketListQueryParams
	): Promise<IGetClientTicketListResponse>;

	getAllTickets(
		queries: IGetAdminTicketListQueryParams
	): Promise<GetAdminTicketListResponse>;

	deleteTickets(req: IDeleteTicketsRequest): Promise<void>;
	createTicket(req: CreateNewTicketRequest): Promise<DbTicket>;
}

export class TicketDao implements ITicketDao {
	async getTicketsAndDates(
		queries: IGetClientTicketListQueryParams
	): Promise<IGetClientTicketListResponse> {
		const tickets = await query<IRawDbITicket[]>(
			connection,
			`
      SELECT 
        tbl_tickets.id,
        tbl_tickets.airlineId,
        tbl_airlines.name as airlineName,
        tbl_airlines.logo as airlineLogo,
        tbl_tickets.sourceId,
        tbl_cities_source.title as sourceTitle,
        tbl_tickets.destinationId,
        tbl_cities_dest.title as destinationTitle,
        tbl_tickets.ticketType,
        tbl_tickets.airplane,
        tbl_tickets.class,
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
          WHERE
              sourceId = ? AND 
              destinationId = ? AND 
              DATE_FORMAT(departureDate, '%Y-%m-%d') = ? AND
              ${
								queries.returnDate
									? `DATE_FORMAT(arrivalDate, '%Y-%m-%d') = ${new Date(
											queries.returnDate
									  )
											.toISOString()
											.substr(0, 10)} AND`
									: ''
							} 
              quantity >= ?
      `,
			[
				+queries.source,
				+queries.destination,
				new Date(queries.departureDate).toISOString().substr(0, 10),
				+(queries.passengers.adult || '') +
					+(queries.passengers.child || '') +
					+(queries.passengers.infant || ''),
			]
		);
		// TODO: the start date in the query is hard-coded for demo purposes
		const dates = await query<IDate[]>(
			connection,
			`
      SELECT 
          departureDate AS date, MIN(price) AS price
      FROM
          tbl_tickets
      WHERE
          DATE_FORMAT(departureDate, '%Y-%m-%d') >= '2021-08-20'
      GROUP BY DATE_FORMAT(departureDate, '%Y-%m-%d')
      ORDER BY departureDate ASC
      LIMIT 21
      `
		);

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
