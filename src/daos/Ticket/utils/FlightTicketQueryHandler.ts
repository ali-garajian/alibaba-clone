import {
	ICommonTicketRoutePathParams,
	IDate,
	IGetClientTicketListQueryParams,
} from '@alibaba-clone/core';

import { BaseTicketQueryHandler } from './base';
import connection, { query } from '../../db';

export class FlightTicketQueryHandler extends BaseTicketQueryHandler {
	async getTicketsAndDates(
		queries: IGetClientTicketListQueryParams,
		{ type }: ICommonTicketRoutePathParams
	) {
		const tickets = await query<any[]>(
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
			tickets,
			dates,
		};
	}
}
