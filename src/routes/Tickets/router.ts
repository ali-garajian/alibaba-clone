import { ETicketCategory } from 'core';
import { Router } from 'express';

import { adminMW } from '../middleware';
import * as actions from './actions';
import validators from './validators';

/* 
  TODO: 
    - add validation 
    - query params are strings by default. Handle data types conversion
*/

const ticketTypes = `${ETicketCategory.Flight}|${ETicketCategory.Train}`;

const ticketRouter = Router();

ticketRouter.get(
	`/client/:type(${ticketTypes})`,
	actions.getAllTicketsAndDates
);

ticketRouter.get(
	`/admin/:type(${ticketTypes})`,
	adminMW,
	validators.getAllTickets,
	actions.getAllTickets as any
);

ticketRouter.delete(
	`/admin/:type(${ticketTypes})`,
	adminMW,
	actions.deleteTickets as any
);

ticketRouter.post(
	`/admin/:type(${ticketTypes})`,
	adminMW,
	actions.createTicket as any
);

export default ticketRouter;
