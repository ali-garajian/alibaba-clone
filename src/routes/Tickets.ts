import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import TicketDao from '@daos/Ticket/TicketDao.mock';
import { IResponseModel } from '@entities/base/ResponseModel';
import {
  GetClientTicketListQueryParams,
  GetClientTicketListResponse,
  GetAdminTicketListQueryParams,
  GetAdminTicketListResponse,
  DeleteAdminTicketsQueryParams,
  CreateNewTicketRequest,
  DbTicket,
} from '@models/Ticket';
import { EMessages } from '@shared/messages';

const ticketDao = new TicketDao();
const { OK } = StatusCodes;

export async function getAllTicketsAndDates(
  req: Request<any, any, any, GetClientTicketListQueryParams>,
  res: Response<IResponseModel<GetClientTicketListResponse>>
) {
  const ticketsListData = await ticketDao.getTicketsAndDates(req.query);
  return res.status(OK).json({
    data: ticketsListData,
  });
}

export async function getAllTickets(
  req: Request<any, any, any, GetAdminTicketListQueryParams>,
  res: Response<IResponseModel<GetAdminTicketListResponse>>
) {
  const tickets = await ticketDao.getAllTickets(req.query);
  return res.status(OK).json({
    data: tickets,
  });
}

export async function deleteTickets(
  req: Request<any, any, any, DeleteAdminTicketsQueryParams>,
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
