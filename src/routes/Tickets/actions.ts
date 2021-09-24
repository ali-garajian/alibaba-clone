import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import {
	IResponseModel,
	IGetClientTicketListQueryParams,
	IGetClientTicketListResponse,
	IGetAdminTicketListQueryParams,
	GetAdminTicketListResponse,
	IDeleteTicketsRequest,
	CreateNewTicketRequest,
} from '@alibaba-clone/core';

import { DbTicket } from '@models/Ticket';
import { EMessages } from '@shared/messages';
import { TicketDao } from '@daos/Ticket/TicketDao';

const ticketDao = new TicketDao();
const { OK } = StatusCodes;

export async function getAllTicketsAndDates(
	req: Request<any, any, any, IGetClientTicketListQueryParams>,
	res: Response<IResponseModel<IGetClientTicketListResponse>>
) {
	const ticketsListData = await ticketDao.getTicketsAndDates(req.query);
	return res.status(OK).json({
		data: ticketsListData,
	});
}

export async function getAllTickets(
	req: Request,
	res: Response<IResponseModel<GetAdminTicketListResponse>>
) {
	const tickets = await ticketDao.getAllTickets(
		req.query as unknown as IGetAdminTicketListQueryParams
	);
	return res.status(OK).json({
		data: tickets,
	});
}

export async function deleteTickets(
	req: Request<any, any, any, IDeleteTicketsRequest>,
	res: Response<IResponseModel>
) {
	await ticketDao.deleteTickets(req.query);
	return res.status(OK).json({
		msg: EMessages.OperationSuccessfull,
	});
}

export async function createTicket(
	req: Request<any, any, CreateNewTicketRequest>,
	res: Response<IResponseModel<DbTicket>>
) {
	const ticket = await ticketDao.createTicket(req.body);
	return res.status(OK).json({
		msg: EMessages.OperationSuccessfull,
		data: ticket,
	});
}
