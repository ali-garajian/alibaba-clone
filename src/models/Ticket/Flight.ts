import { DbFlightTicketModel, IFlightTicket } from '@alibaba-clone/core';

export interface IDbGetClientFlightTicketListTicketModel
	extends DbFlightTicketModel {
	airlineName: string;
	airlineLogo: string;
	sourceTitle: string;
	destinationTitle: string;
}

export function createGetClientFlightTicketListDto(
	tickets: IDbGetClientFlightTicketListTicketModel[]
): IFlightTicket[] {
	return tickets.map((ticket) => {
		const {
			airlineId,
			airlineName,
			airlineLogo,
			sourceId,
			sourceTitle,
			destinationId,
			destinationTitle,
			...rest
		} = ticket;

		return {
			...rest,
			airline: {
				id: airlineId,
				name: airlineName,
				logo: airlineLogo,
			},
			source: {
				id: sourceId,
				title: sourceTitle,
			},
			destination: {
				id: destinationId,
				title: destinationTitle,
			},
		};
	});
}
