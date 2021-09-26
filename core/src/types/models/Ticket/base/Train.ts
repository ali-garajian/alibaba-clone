import { IdTitleModel, Image } from '../../../base'
import { IRailRoadCompany } from '../../RailRoad'

export enum ETrainType {
    FourManCompartment = 'compartment-4',
    SixManCompartment = 'compartment-6',
    FourAisleCompartment = 'aisle-4',
}

export interface ITrainTicket {
    id: number
    trainType: ETrainType
    railroadCompany: IRailRoadCompany
    name: string
    category: string
    source: IdTitleModel
    destination: IdTitleModel
    departureDate: string
    arrivalDate: string
    price: number
    quantity: number
}
export interface ITrainInfo {
    stars: 1 | 2 | 3 | 4 | 5
    category: string
    trainType: ETrainType
    trainFacilities: string[]
    compartmentFacilities: string[]
    diningOptions: string[]
    images: Image[]
}
