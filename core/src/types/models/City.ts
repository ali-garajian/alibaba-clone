import { IdTitleModel } from 'types/base/IdTitleModel';

// GET /cities
export interface IGetCitiesQueryParams {
  q?: string;
}
export type GetCitiesResponse = IdTitleModel[];
