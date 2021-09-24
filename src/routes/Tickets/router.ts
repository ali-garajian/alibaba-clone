import { Router } from 'express';

import { adminMW } from '../middleware';
import * as actions from './actions';
import validators from './validators';

/* 
  TODO: 
    - add validation 
    - query params are strings by default. Handle data types conversion
*/

const ticketRouter = Router();

ticketRouter.get('/client', actions.getAllTicketsAndDates);
ticketRouter.get(
	'/admin',
	adminMW,
	validators.getAllTickets,
	actions.getAllTickets
);
ticketRouter.delete('/admin', adminMW, actions.deleteTickets as any);
ticketRouter.post('/admin', adminMW, actions.createTicket);

export default ticketRouter;
