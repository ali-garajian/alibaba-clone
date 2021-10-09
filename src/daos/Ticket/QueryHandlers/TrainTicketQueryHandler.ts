import {
	CreateNewTrainTicketRequest,
	DbTrainTicketModel,
	GetAdminTicketListResponse,
	IDate,
	IDeleteTicketsRequest,
	IGetAdminTicketListQueryParams,
	IGetClientTicketListQueryParams,
	TicketTableRepresentation,
} from '@alibaba-clone/core';

import {
	IDbGetClientTrainTicketListTicketModel,
	createGetClientTrainTicketListDto,
} from '@models/Ticket';
import { BaseTicketQueryHandler } from './BaseTicketQueryHandler';
import connection, { query } from '../../db';

export class TrainTicketQueryHandler implements BaseTicketQueryHandler {
	async getClientTickets(queries: IGetClientTicketListQueryParams) {
		const tickets = await query<IDbGetClientTrainTicketListTicketModel[]>(
			connection,
			`
            SELECT 
                tbl_train_tickets.id,
                tbl_train_tickets.trainType,
                tbl_train_tickets.railroadId,
                tbl_railroads.name as railroadName,
                tbl_railroads.logo as railroadLogo,
                tbl_train_tickets.trainId,
                concat(tbl_railroads.name, ' ', tbl_train_tickets.trainId) as trainName,
                tbl_train_tickets.categoryId,
                tbl_train_categories.title as categoryTitle,
                tbl_train_tickets.sourceId,
                tbl_cities_source.title as sourceTitle,
                tbl_train_tickets.destinationId,
                tbl_cities_dest.title as destinationTitle,
                tbl_train_tickets.departureDate,
                tbl_train_tickets.arrivalDate,
                tbl_train_tickets.price,
                tbl_train_tickets.quantity
            FROM
                tbl_train_tickets
                    INNER JOIN
                tbl_railroads ON tbl_train_tickets.railroadId = tbl_railroads.id
                    INNER JOIN
                tbl_cities AS tbl_cities_source ON tbl_train_tickets.sourceId = tbl_cities_source.id
                    INNER JOIN
                tbl_cities AS tbl_cities_dest ON tbl_train_tickets.destinationId = tbl_cities_dest.id
                    INNER JOIN
                tbl_train_categories ON tbl_train_categories.id = tbl_train_tickets.categoryId
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

		return createGetClientTrainTicketListDto(tickets);
	}
	async getClientDates() {
		// TODO: the start date in the query is hard-coded for demo purposes
		const dates = await query<IDate[]>(
			connection,
			`
            SELECT 
                departureDate AS date, MIN(price) AS price
            FROM
                tbl_train_tickets
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
		const dates = await query<TicketTableRepresentation[]>(
			connection,
			`
            SELECT 
                tbl_train_tickets.id,
                concat(tbl_railroads.name, ' ', tbl_train_tickets.trainId) as trainName,
                tbl_train_tickets.departureDate,
                tbl_train_categories.title as categoryTitle,
                tbl_train_tickets.price,
                tbl_train_tickets.quantity,
                tbl_railroads.name as railroad,
                tbl_train_tickets.trainType,
                tbl_cities_source.title as sourceTitle,
                tbl_cities_dest.title as destinationTitle
            FROM
                tbl_train_tickets
                    INNER JOIN
                tbl_railroads ON tbl_train_tickets.railroadId = tbl_railroads.id
                    INNER JOIN
                tbl_cities AS tbl_cities_source ON tbl_train_tickets.sourceId = tbl_cities_source.id
                    INNER JOIN
                tbl_cities AS tbl_cities_dest ON tbl_train_tickets.destinationId = tbl_cities_dest.id
                    INNER JOIN
                tbl_train_categories ON tbl_train_categories.id = tbl_train_tickets.categoryId
            ${
							queries.source || queries.destination || queries.departureDate
								? 'WHERE'
								: ''
						}
            ${queries.source ? 'sourceId = ?' : ''} 
            ${queries.destination ? 'AND destinationId = ?' : ''} 
            ${
							queries.departureDate
								? `AND DATE_FORMAT(departureDate, '%Y-%m-%d') = ?`
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

		return dates;
	}
	async deleteTickets(req: IDeleteTicketsRequest): Promise<void> {
		await query<any>(
			connection,
			`
            DELETE FROM tbl_train_tickets 
            WHERE id = ?  
            `,
			req.ids.map((i) => +i)
		);
	}
	async createTicket(
		req: CreateNewTrainTicketRequest
	): Promise<DbTrainTicketModel> {
		const result = await query<any>(
			connection,
			`INSERT INTO tbl_train_tickets set ?`,
			req
		);

		return {
			...req,
			id: result.insertId,
		};
	}
}
