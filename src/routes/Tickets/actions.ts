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
	ICommonTicketParams,
	CreateNewTicketResponse,
} from '@alibaba-clone/core';

import { EMessages } from '@shared/messages';
import { TicketDao } from '@daos/Ticket/TicketDao';

const ticketDao = new TicketDao();
const { OK } = StatusCodes;

export async function getAllTicketsAndDates(
	req: Request<ICommonTicketParams, any, any, IGetClientTicketListQueryParams>,
	res: Response<IResponseModel<IGetClientTicketListResponse>>
) {
	const ticketsListData = await ticketDao.getTicketsAndDates(
		req.query,
		req.params.type
	);
	return res.status(OK).json({
		data: ticketsListData,
	});
}

export async function getAllTickets(
	req: Request<ICommonTicketParams, any, any, IGetAdminTicketListQueryParams>,
	res: Response<IResponseModel<GetAdminTicketListResponse>>
) {
	const tickets = await ticketDao.getAllTickets(req.query, req.params.type);
	return res.status(OK).json({
		data: tickets,
	});
}

export async function deleteTickets(
	req: Request<ICommonTicketParams, any, any, IDeleteTicketsRequest>,
	res: Response<IResponseModel>
) {
	await ticketDao.deleteTickets(req.query, req.params.type);
	return res.status(OK).json({
		msg: EMessages.OperationSuccessfull,
	});
}

export async function createTicket(
	req: Request<ICommonTicketParams, any, CreateNewTicketRequest>,
	res: Response<IResponseModel<CreateNewTicketResponse>>
) {
	const ticket = await ticketDao.createTicket(req.body, req.params.type);
	return res.status(OK).json({
		msg: EMessages.OperationSuccessfull,
		data: ticket,
	});
}
