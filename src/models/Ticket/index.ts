import { IDbGetClientFlightTicketListTicketModel } from './Flight';
import { IDbGetClientTrainTicketListTicketModel } from './Train';

export * from './Flight';
export * from './Train';

export type DbGetClientTicketListTicketModel =
	| IDbGetClientFlightTicketListTicketModel
	| IDbGetClientTrainTicketListTicketModel;
