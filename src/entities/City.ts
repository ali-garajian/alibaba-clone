import { IdTitleModel } from './base/IdModel';

// GET /city
export interface IGetCitiesQueryParams {
  q?: string;
}
export type GetCitiesResponse = IdTitleModel[];
