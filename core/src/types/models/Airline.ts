import { IdTitleModel } from '../base';

export interface IAirline {
  id: number;
  logo: string;
  name: string;
  cheapestPrice?: number;
}

// GET /airlines/admin
export type GetAirlinesResponse = IdTitleModel[];
