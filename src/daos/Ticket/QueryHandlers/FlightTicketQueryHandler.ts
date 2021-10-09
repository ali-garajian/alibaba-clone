import {
	CreateNewFlightTicketRequest,
	DbFlightTicketModel,
	GetAdminTicketListResponse,
	IDate,
	IDeleteTicketsRequest,
	IGetAdminTicketListQueryParams,
	IGetClientTicketListQueryParams,
	TicketTableRepresentation,
} from '@alibaba-clone/core';

import {
	IDbGetClientFlightTicketListTicketModel,
	createGetClientFlightTicketListDto,
} from '@models/Ticket';
import { BaseTicketQueryHandler } from './BaseTicketQueryHandler';
import connection, { query } from '../../db';

export class FlightTicketQueryHandler implements BaseTicketQueryHandler {
	async getClientTickets(queries: IGetClientTicketListQueryParams) {
		const tickets = await query<IDbGetClientFlightTicketListTicketModel[]>(
			connection,
			`
			SELECT 
					tbl_flight_tickets.id,
					tbl_flight_tickets.airlineId,
					tbl_airlines.name as airlineName,
					tbl_airlines.logo as airlineLogo,
					tbl_flight_tickets.sourceId,
					tbl_cities_source.title as sourceTitle,
					tbl_flight_tickets.destinationId,
					tbl_cities_dest.title as destinationTitle,
					tbl_flight_tickets.ticketType,
					tbl_flight_tickets.airplane,
					tbl_flight_tickets.class,
					tbl_flight_tickets.arrivalDate,
					tbl_flight_tickets.departureDate,
					tbl_flight_tickets.permittedLoggage,
					tbl_flight_tickets.terminalNumber,
					tbl_flight_tickets.price,
					tbl_flight_tickets.quantity
					FROM
							tbl_flight_tickets
									INNER JOIN
							tbl_airlines ON tbl_flight_tickets.airlineId = tbl_airlines.id
									INNER JOIN
							tbl_cities AS tbl_cities_source ON tbl_flight_tickets.sourceId = tbl_cities_source.id
									INNER JOIN
							tbl_cities AS tbl_cities_dest ON tbl_flight_tickets.destinationId = tbl_cities_dest.id
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

		return createGetClientFlightTicketListDto(tickets);
	}
	async getClientDates() {
		// TODO: the start date in the query is hard-coded for demo purposes
		const dates = await query<IDate[]>(
			connection,
			`
            SELECT 
                departureDate AS date, MIN(price) AS price
            FROM
                tbl_flight_tickets
            WHERE
                DATE_FORMAT(departureDate, '%Y-%m-%d') >= '2021-08-20'
            GROUP BY DATE_FORMAT(departureDate, '%Y-%m-%d')
            ORDER BY departureDate ASC
            LIMIT 21
            `
		);

		return dates;
	}
	async getAdminTickets(
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
                tbl_flight_tickets.id,
                tbl_airlines.name as airline,
                tbl_cities_source.title as source,
                tbl_cities_dest.title as destination,
                if(tbl_flight_tickets.ticketType = 'charters', 'چارتر', 'سیستمی') as ticketType,
                tbl_flight_tickets.airplane,
                if(tbl_flight_tickets.class = 'Economy', 'اکونومی', 'بیزینس') as class,
                tbl_flight_tickets.arrivalDate,
                tbl_flight_tickets.departureDate,
                tbl_flight_tickets.permittedLoggage,
                tbl_flight_tickets.terminalNumber,
                tbl_flight_tickets.price,
                tbl_flight_tickets.quantity
                FROM
                    tbl_flight_tickets
                        INNER JOIN
                    tbl_airlines ON tbl_flight_tickets.airlineId = tbl_airlines.id
                        INNER JOIN
                    tbl_cities AS tbl_cities_source ON tbl_flight_tickets.sourceId = tbl_cities_source.id
                        INNER JOIN
                    tbl_cities AS tbl_cities_dest ON tbl_flight_tickets.destinationId = tbl_cities_dest.id
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
            DELETE FROM tbl_flight_tickets 
            WHERE id = ?  
            `,
			req.ids.map((i) => +i)
		);
	}
	async createTicket(
		req: CreateNewFlightTicketRequest
	): Promise<DbFlightTicketModel> {
		const result = await query<any>(
			connection,
			`INSERT INTO tbl_flight_tickets set ?`,
			req
		);

		return {
			...req,
			id: result.insertId,
		};
	}
}
