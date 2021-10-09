import { DbTrainTicketModel, ITrainTicket } from '@alibaba-clone/core';

export interface IDbGetClientTrainTicketListTicketModel
	extends DbTrainTicketModel {
	railroadName: string;
	railroadLogo: string;
	sourceTitle: string;
	destinationTitle: string;
	categoryTitle: string;
	trainName: string;
}

export function createGetClientTrainTicketListDto(
	tickets: IDbGetClientTrainTicketListTicketModel[]
): ITrainTicket[] {
	return tickets.map((ticket) => {
		const {
			railroadId,
			railroadName,
			railroadLogo,
			sourceId,
			sourceTitle,
			destinationId,
			destinationTitle,
			categoryId,
			categoryTitle,
			...rest
		} = ticket;

		return {
			...rest,
			railroad: {
				id: railroadId,
				name: railroadName,
				logo: railroadLogo,
			},
			source: {
				id: sourceId,
				title: sourceTitle,
			},
			destination: {
				id: destinationId,
				title: destinationTitle,
			},
			category: {
				id: categoryId,
				title: categoryTitle,
			},
		};
	});
}
