import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import AirlineDao from '@daos/Airline/AirlineDao.mock';
import { IResponseModel } from '@entities/base/ResponseModel';
import { GetAdminAirlinesResponse } from '@models/Airline';

const airlineDao = new AirlineDao();
const { OK } = StatusCodes;

export async function getAirlinesAsOptions(
  req: Request,
  res: Response<IResponseModel<GetAdminAirlinesResponse>>
) {
  const airlines = await airlineDao.getAirlinesAsOptions();
  return res.status(OK).json({
    data: airlines,
  });
}
