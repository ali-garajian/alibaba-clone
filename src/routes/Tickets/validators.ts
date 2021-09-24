import { ValidationChain, query } from 'express-validator';

import * as actions from './actions';
import { paginationValidators } from '@shared';

const validators: Record<keyof typeof actions, ValidationChain[]> = {
	getAllTickets: [
		...paginationValidators,
		query('source').optional().toInt(),
		query('destination').optional().toInt(),
	],
	getAllTicketsAndDates: [],
	createTicket: [],
	deleteTickets: [],
};

export default validators;
