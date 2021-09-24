import { query, ValidationChain } from 'express-validator';

export const paginationValidators: ValidationChain[] = [
	query('page').toInt(),
	query('limit').optional().toInt(),
];
