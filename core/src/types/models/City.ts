import { IdTitleModel } from '../base'

// GET /cities
export interface IGetCitiesQueryParams {
    q?: string
}
export type GetCitiesResponse = IdTitleModel[]
