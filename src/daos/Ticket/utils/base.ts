import { IFlightTicket, ITrainTicket, IDate } from '@alibaba-clone/core';

export abstract class BaseTicketQueryHandler {
	abstract getTicketsAndDates(...args: any[]): Promise<{
		tickets: (IFlightTicket | ITrainTicket)[];
		dates: IDate[];
	}>;
}
