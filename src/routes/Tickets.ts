import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import TicketDao from '@daos/Ticket/TicketDao.mock';
import { IResponseModel } from '@entities/base/ResponseModel';
import {
  IGetTicketListQueryParams,
  IGetTicketListResponse,
} from '@entities/Ticket';

const ticketDao = new TicketDao();
const { OK } = StatusCodes;

export async function getAllTickets(
  req: Request<any, any, any, IGetTicketListQueryParams>,
  res: Response<IResponseModel<IGetTicketListResponse>>
) {
  const ticketsListData = await ticketDao.getTicketsListData(req.query);
  return res.status(OK).json({
    data: ticketsListData,
  });
}
