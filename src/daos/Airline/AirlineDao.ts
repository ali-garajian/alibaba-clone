import { GetAirlinesResponse } from '@alibaba-clone/core';

export interface IAirlineDao {
	getAirlinesAsOptions(): Promise<GetAirlinesResponse>;
}
