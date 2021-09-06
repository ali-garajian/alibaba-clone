import { GetAdminAirlinesResponse } from '@models/Airline';

export interface IAirlineDao {
  getAirlinesAsOptions(): Promise<GetAdminAirlinesResponse>;
}
