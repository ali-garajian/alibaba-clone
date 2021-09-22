import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import AirlineDao from '@daos/Airline/AirlineDao.mock';
import { IResponseModel, GetAirlinesResponse } from '@alibaba-clone/core';

const airlineDao = new AirlineDao();
const { OK } = StatusCodes;

export async function getAirlinesAsOptions(
	req: Request,
	res: Response<IResponseModel<GetAirlinesResponse>>
) {
	const airlines = await airlineDao.getAirlinesAsOptions();
	return res.status(OK).json({
		data: airlines,
	});
}
