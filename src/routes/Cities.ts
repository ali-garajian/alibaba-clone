import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import CityDao from '@daos/City/CityDao.mock';
import {
	IResponseModel,
	IGetCitiesQueryParams,
	GetCitiesResponse,
} from '@alibaba-clone/core';

const cityDao = new CityDao();
const { OK } = StatusCodes;

export async function getAllCities(
	req: Request<any, any, any, IGetCitiesQueryParams>,
	res: Response<IResponseModel<GetCitiesResponse>>
) {
	const cities = await cityDao.getAllCities(req.query);
	return res.status(OK).json({
		data: cities,
	});
}
