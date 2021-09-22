import { ITicket } from '@alibaba-clone/core';

// TODO: come up with a naming convention for domain models & refactor

export type DbTicket = Omit<ITicket, 'airline' | 'source' | 'destination'> & {
	airlineId: number;
	sourceId: number;
	destinationId: number;
};
export interface IRawDbITicket extends DbTicket {
	airlineName: string;
	airlineLogo: string;
	sourceTitle: string;
	destinationTitle: string;
}
export function convertToITicket(ticket: IRawDbITicket): ITicket {
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
}
