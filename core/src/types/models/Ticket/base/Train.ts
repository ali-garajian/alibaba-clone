import { IdTitleModel, Image } from '../../../base'
import { IRailRoad } from '../../RailRoad'

export enum ETrainType {
    FourManCompartment = 'compartment-4',
    SixManCompartment = 'compartment-6',
    FourAisleCompartment = 'aisle-4',
}

export interface ITrainTicket {
    id: number
    trainType: ETrainType
    railroad: IRailRoad
    trainName: string
    category: IdTitleModel
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

export type TrainTicketTableRepresentation = Pick<
    ITrainTicket,
    'id' | 'trainName' | 'departureDate' | 'category' | 'price' | 'quantity'
> &
    Record<'railroad' | 'trainType' | 'source' | 'destination', string>

export type CreateNewTrainTicketRequest = Omit<
    ITrainTicket,
    'id' | 'railroad' | 'source' | 'destination' | 'category' | 'trainName'
> & {
    railroadId: number
    sourceId: number
    destinationId: number
    categoryId: number
    trainId: number
}

export type DbTrainTicketModel = Omit<
    ITrainTicket,
    'railroad' | 'source' | 'destination' | 'trainName' | 'category'
> & {
    railroadId: number
    trainId: number
    sourceId: number
    destinationId: number
    categoryId: number
}

// function generateTickets(): DbTrainTicketModel[] {
//     const cities = [1, 2, 3, 4, 5, 6, 7]
//     const trains = [
//         {
//             railroadId: 7,
//             trainId: 335,
//         },
//         {
//             railroadId: 5,
//             trainId: 390,
//         },
//         {
//             railroadId: 7,
//             trainId: 383,
//         },
//         {
//             railroadId: 6,
//             trainId: 340,
//         },
//         {
//             railroadId: 6,
//             trainId: 395,
//         },
//         {
//             railroadId: 5,
//             trainId: 373,
//         },
//         {
//             railroadId: 6,
//             trainId: 301,
//         },
//         {
//             railroadId: 3,
//             trainId: 369,
//         },
//         {
//             railroadId: 3,
//             trainId: 393,
//         },
//         {
//             railroadId: 7,
//             trainId: 324,
//         },
//         {
//             railroadId: 1,
//             trainId: 348,
//         },
//         {
//             railroadId: 4,
//             trainId: 302,
//         },
//         {
//             railroadId: 2,
//             trainId: 307,
//         },
//         {
//             railroadId: 5,
//             trainId: 359,
//         },
//         {
//             railroadId: 5,
//             trainId: 346,
//         },
//         {
//             railroadId: 1,
//             trainId: 343,
//         },
//         {
//             railroadId: 7,
//             trainId: 377,
//         },
//         {
//             railroadId: 3,
//             trainId: 370,
//         },
//         {
//             railroadId: 1,
//             trainId: 370,
//         },
//         {
//             railroadId: 3,
//             trainId: 303,
//         },
//         {
//             railroadId: 5,
//             trainId: 375,
//         },
//         {
//             railroadId: 2,
//             trainId: 336,
//         },
//         {
//             railroadId: 6,
//             trainId: 342,
//         },
//         {
//             railroadId: 7,
//             trainId: 349,
//         },
//         {
//             railroadId: 3,
//             trainId: 379,
//         },
//         {
//             railroadId: 1,
//             trainId: 399,
//         },
//         {
//             railroadId: 5,
//             trainId: 341,
//         },
//         {
//             railroadId: 1,
//             trainId: 326,
//         },
//         {
//             railroadId: 3,
//             trainId: 346,
//         },
//         {
//             railroadId: 4,
//             trainId: 371,
//         },
//         {
//             railroadId: 2,
//             trainId: 337,
//         },
//         {
//             railroadId: 5,
//             trainId: 398,
//         },
//         {
//             railroadId: 3,
//             trainId: 365,
//         },
//         {
//             railroadId: 5,
//             trainId: 361,
//         },
//         {
//             railroadId: 2,
//             trainId: 335,
//         },
//         {
//             railroadId: 1,
//             trainId: 327,
//         },
//         {
//             railroadId: 5,
//             trainId: 323,
//         },
//         {
//             railroadId: 1,
//             trainId: 313,
//         },
//         {
//             railroadId: 7,
//             trainId: 382,
//         },
//         {
//             railroadId: 4,
//             trainId: 367,
//         },
//         {
//             railroadId: 7,
//             trainId: 387,
//         },
//         {
//             railroadId: 1,
//             trainId: 333,
//         },
//         {
//             railroadId: 5,
//             trainId: 319,
//         },
//         {
//             railroadId: 5,
//             trainId: 325,
//         },
//         {
//             railroadId: 1,
//             trainId: 358,
//         },
//         {
//             railroadId: 5,
//             trainId: 353,
//         },
//         {
//             railroadId: 1,
//             trainId: 350,
//         },
//         {
//             railroadId: 7,
//             trainId: 395,
//         },
//         {
//             railroadId: 7,
//             trainId: 360,
//         },
//         {
//             railroadId: 7,
//             trainId: 318,
//         },
//         {
//             railroadId: 3,
//             trainId: 340,
//         },
//         {
//             railroadId: 5,
//             trainId: 379,
//         },
//         {
//             railroadId: 4,
//             trainId: 337,
//         },
//         {
//             railroadId: 6,
//             trainId: 394,
//         },
//         {
//             railroadId: 4,
//             trainId: 322,
//         },
//         {
//             railroadId: 2,
//             trainId: 352,
//         },
//         {
//             railroadId: 3,
//             trainId: 367,
//         },
//         {
//             railroadId: 3,
//             trainId: 386,
//         },
//         {
//             railroadId: 3,
//             trainId: 300,
//         },
//         {
//             railroadId: 2,
//             trainId: 301,
//         },
//         {
//             railroadId: 3,
//             trainId: 388,
//         },
//         {
//             railroadId: 3,
//             trainId: 387,
//         },
//         {
//             railroadId: 7,
//             trainId: 356,
//         },
//         {
//             railroadId: 1,
//             trainId: 368,
//         },
//         {
//             railroadId: 4,
//             trainId: 383,
//         },
//         {
//             railroadId: 6,
//             trainId: 373,
//         },
//         {
//             railroadId: 1,
//             trainId: 375,
//         },
//         {
//             railroadId: 6,
//             trainId: 358,
//         },
//         {
//             railroadId: 4,
//             trainId: 361,
//         },
//         {
//             railroadId: 3,
//             trainId: 382,
//         },
//         {
//             railroadId: 7,
//             trainId: 359,
//         },
//         {
//             railroadId: 1,
//             trainId: 357,
//         },
//         {
//             railroadId: 7,
//             trainId: 320,
//         },
//         {
//             railroadId: 4,
//             trainId: 363,
//         },
//         {
//             railroadId: 2,
//             trainId: 382,
//         },
//         {
//             railroadId: 3,
//             trainId: 333,
//         },
//         {
//             railroadId: 1,
//             trainId: 393,
//         },
//         {
//             railroadId: 4,
//             trainId: 329,
//         },
//         {
//             railroadId: 1,
//             trainId: 354,
//         },
//         {
//             railroadId: 2,
//             trainId: 376,
//         },
//         {
//             railroadId: 4,
//             trainId: 396,
//         },
//         {
//             railroadId: 6,
//             trainId: 369,
//         },
//         {
//             railroadId: 4,
//             trainId: 349,
//         },
//         {
//             railroadId: 2,
//             trainId: 345,
//         },
//         {
//             railroadId: 5,
//             trainId: 310,
//         },
//         {
//             railroadId: 6,
//             trainId: 360,
//         },
//         {
//             railroadId: 2,
//             trainId: 300,
//         },
//         {
//             railroadId: 1,
//             trainId: 302,
//         },
//         {
//             railroadId: 4,
//             trainId: 395,
//         },
//         {
//             railroadId: 4,
//             trainId: 342,
//         },
//         {
//             railroadId: 1,
//             trainId: 314,
//         },
//         {
//             railroadId: 7,
//             trainId: 362,
//         },
//         {
//             railroadId: 4,
//             trainId: 348,
//         },
//         {
//             railroadId: 5,
//             trainId: 324,
//         },
//         {
//             railroadId: 4,
//             trainId: 377,
//         },
//         {
//             railroadId: 2,
//             trainId: 381,
//         },
//         {
//             railroadId: 1,
//             trainId: 351,
//         },
//         {
//             railroadId: 5,
//             trainId: 376,
//         },
//         {
//             railroadId: 4,
//             trainId: 336,
//         },
//         {
//             railroadId: 1,
//             trainId: 325,
//         },
//         {
//             railroadId: 5,
//             trainId: 349,
//         },
//         {
//             railroadId: 1,
//             trainId: 398,
//         },
//         {
//             railroadId: 1,
//             trainId: 322,
//         },
//         {
//             railroadId: 3,
//             trainId: 368,
//         },
//         {
//             railroadId: 4,
//             trainId: 304,
//         },
//         {
//             railroadId: 6,
//             trainId: 378,
//         },
//         {
//             railroadId: 3,
//             trainId: 321,
//         },
//         {
//             railroadId: 7,
//             trainId: 330,
//         },
//         {
//             railroadId: 3,
//             trainId: 390,
//         },
//         {
//             railroadId: 4,
//             trainId: 385,
//         },
//         {
//             railroadId: 6,
//             trainId: 367,
//         },
//         {
//             railroadId: 2,
//             trainId: 396,
//         },
//         {
//             railroadId: 4,
//             trainId: 331,
//         },
//         {
//             railroadId: 6,
//             trainId: 377,
//         },
//         {
//             railroadId: 7,
//             trainId: 300,
//         },
//         {
//             railroadId: 3,
//             trainId: 324,
//         },
//         {
//             railroadId: 3,
//             trainId: 354,
//         },
//         {
//             railroadId: 5,
//             trainId: 303,
//         },
//         {
//             railroadId: 5,
//             trainId: 327,
//         },
//         {
//             railroadId: 2,
//             trainId: 370,
//         },
//         {
//             railroadId: 6,
//             trainId: 333,
//         },
//         {
//             railroadId: 4,
//             trainId: 341,
//         },
//         {
//             railroadId: 4,
//             trainId: 358,
//         },
//         {
//             railroadId: 3,
//             trainId: 306,
//         },
//         {
//             railroadId: 6,
//             trainId: 372,
//         },
//         {
//             railroadId: 7,
//             trainId: 333,
//         },
//         {
//             railroadId: 1,
//             trainId: 345,
//         },
//         {
//             railroadId: 6,
//             trainId: 376,
//         },
//         {
//             railroadId: 2,
//             trainId: 328,
//         },
//         {
//             railroadId: 4,
//             trainId: 368,
//         },
//         {
//             railroadId: 6,
//             trainId: 327,
//         },
//         {
//             railroadId: 4,
//             trainId: 359,
//         },
//         {
//             railroadId: 4,
//             trainId: 354,
//         },
//         {
//             railroadId: 1,
//             trainId: 323,
//         },
//         {
//             railroadId: 4,
//             trainId: 388,
//         },
//         {
//             railroadId: 6,
//             trainId: 374,
//         },
//         {
//             railroadId: 3,
//             trainId: 376,
//         },
//         {
//             railroadId: 1,
//             trainId: 328,
//         },
//         {
//             railroadId: 1,
//             trainId: 303,
//         },
//         {
//             railroadId: 6,
//             trainId: 351,
//         },
//         {
//             railroadId: 3,
//             trainId: 313,
//         },
//         {
//             railroadId: 5,
//             trainId: 394,
//         },
//         {
//             railroadId: 3,
//             trainId: 319,
//         },
//         {
//             railroadId: 2,
//             trainId: 323,
//         },
//         {
//             railroadId: 7,
//             trainId: 371,
//         },
//         {
//             railroadId: 2,
//             trainId: 343,
//         },
//         {
//             railroadId: 6,
//             trainId: 365,
//         },
//         {
//             railroadId: 1,
//             trainId: 342,
//         },
//         {
//             railroadId: 5,
//             trainId: 335,
//         },
//         {
//             railroadId: 4,
//             trainId: 357,
//         },
//         {
//             railroadId: 5,
//             trainId: 386,
//         },
//         {
//             railroadId: 6,
//             trainId: 311,
//         },
//         {
//             railroadId: 3,
//             trainId: 314,
//         },
//         {
//             railroadId: 2,
//             trainId: 349,
//         },
//         {
//             railroadId: 6,
//             trainId: 319,
//         },
//         {
//             railroadId: 3,
//             trainId: 337,
//         },
//         {
//             railroadId: 2,
//             trainId: 303,
//         },
//         {
//             railroadId: 3,
//             trainId: 317,
//         },
//         {
//             railroadId: 7,
//             trainId: 384,
//         },
//         {
//             railroadId: 5,
//             trainId: 334,
//         },
//         {
//             railroadId: 6,
//             trainId: 336,
//         },
//         {
//             railroadId: 6,
//             trainId: 304,
//         },
//         {
//             railroadId: 6,
//             trainId: 320,
//         },
//         {
//             railroadId: 5,
//             trainId: 355,
//         },
//         {
//             railroadId: 7,
//             trainId: 312,
//         },
//         {
//             railroadId: 5,
//             trainId: 329,
//         },
//         {
//             railroadId: 5,
//             trainId: 318,
//         },
//         {
//             railroadId: 1,
//             trainId: 339,
//         },
//         {
//             railroadId: 3,
//             trainId: 377,
//         },
//         {
//             railroadId: 7,
//             trainId: 381,
//         },
//         {
//             railroadId: 4,
//             trainId: 343,
//         },
//         {
//             railroadId: 6,
//             trainId: 331,
//         },
//         {
//             railroadId: 6,
//             trainId: 317,
//         },
//         {
//             railroadId: 2,
//             trainId: 386,
//         },
//         {
//             railroadId: 5,
//             trainId: 389,
//         },
//         {
//             railroadId: 3,
//             trainId: 359,
//         },
//         {
//             railroadId: 6,
//             trainId: 323,
//         },
//         {
//             railroadId: 6,
//             trainId: 398,
//         },
//         {
//             railroadId: 1,
//             trainId: 359,
//         },
//         {
//             railroadId: 5,
//             trainId: 392,
//         },
//         {
//             railroadId: 7,
//             trainId: 337,
//         },
//         {
//             railroadId: 3,
//             trainId: 360,
//         },
//         {
//             railroadId: 4,
//             trainId: 384,
//         },
//         {
//             railroadId: 2,
//             trainId: 321,
//         },
//         {
//             railroadId: 1,
//             trainId: 316,
//         },
//         {
//             railroadId: 3,
//             trainId: 378,
//         },
//         {
//             railroadId: 3,
//             trainId: 323,
//         },
//         {
//             railroadId: 7,
//             trainId: 308,
//         },
//         {
//             railroadId: 1,
//             trainId: 376,
//         },
//         {
//             railroadId: 2,
//             trainId: 360,
//         },
//         {
//             railroadId: 1,
//             trainId: 373,
//         },
//         {
//             railroadId: 6,
//             trainId: 359,
//         },
//         {
//             railroadId: 5,
//             trainId: 340,
//         },
//         {
//             railroadId: 5,
//             trainId: 384,
//         },
//         {
//             railroadId: 7,
//             trainId: 339,
//         },
//         {
//             railroadId: 2,
//             trainId: 339,
//         },
//         {
//             railroadId: 3,
//             trainId: 375,
//         },
//         {
//             railroadId: 2,
//             trainId: 397,
//         },
//         {
//             railroadId: 3,
//             trainId: 312,
//         },
//         {
//             railroadId: 7,
//             trainId: 354,
//         },
//         {
//             railroadId: 7,
//             trainId: 389,
//         },
//         {
//             railroadId: 2,
//             trainId: 316,
//         },
//         {
//             railroadId: 4,
//             trainId: 376,
//         },
//         {
//             railroadId: 3,
//             trainId: 399,
//         },
//         {
//             railroadId: 6,
//             trainId: 355,
//         },
//         {
//             railroadId: 1,
//             trainId: 346,
//         },
//         {
//             railroadId: 4,
//             trainId: 330,
//         },
//         {
//             railroadId: 1,
//             trainId: 386,
//         },
//         {
//             railroadId: 4,
//             trainId: 306,
//         },
//         {
//             railroadId: 7,
//             trainId: 322,
//         },
//         {
//             railroadId: 6,
//             trainId: 309,
//         },
//         {
//             railroadId: 6,
//             trainId: 397,
//         },
//         {
//             railroadId: 7,
//             trainId: 351,
//         },
//         {
//             railroadId: 7,
//             trainId: 365,
//         },
//         {
//             railroadId: 1,
//             trainId: 371,
//         },
//         {
//             railroadId: 5,
//             trainId: 336,
//         },
//         {
//             railroadId: 6,
//             trainId: 316,
//         },
//         {
//             railroadId: 5,
//             trainId: 387,
//         },
//         {
//             railroadId: 1,
//             trainId: 300,
//         },
//         {
//             railroadId: 3,
//             trainId: 398,
//         },
//         {
//             railroadId: 5,
//             trainId: 312,
//         },
//         {
//             railroadId: 1,
//             trainId: 381,
//         },
//         {
//             railroadId: 3,
//             trainId: 392,
//         },
//         {
//             railroadId: 4,
//             trainId: 350,
//         },
//         {
//             railroadId: 6,
//             trainId: 310,
//         },
//         {
//             railroadId: 4,
//             trainId: 351,
//         },
//         {
//             railroadId: 1,
//             trainId: 317,
//         },
//         {
//             railroadId: 2,
//             trainId: 391,
//         },
//         {
//             railroadId: 4,
//             trainId: 307,
//         },
//         {
//             railroadId: 1,
//             trainId: 366,
//         },
//         {
//             railroadId: 2,
//             trainId: 326,
//         },
//         {
//             railroadId: 1,
//             trainId: 318,
//         },
//         {
//             railroadId: 2,
//             trainId: 341,
//         },
//         {
//             railroadId: 6,
//             trainId: 325,
//         },
//         {
//             railroadId: 3,
//             trainId: 366,
//         },
//         {
//             railroadId: 3,
//             trainId: 302,
//         },
//         {
//             railroadId: 3,
//             trainId: 310,
//         },
//         {
//             railroadId: 3,
//             trainId: 327,
//         },
//         {
//             railroadId: 2,
//             trainId: 380,
//         },
//         {
//             railroadId: 6,
//             trainId: 391,
//         },
//         {
//             railroadId: 5,
//             trainId: 356,
//         },
//     ]

//     return Array.from({ length: 10 }, (_, i) => i + 1).map((i) => {
//         const train = trains[Math.floor(Math.random() * trains.length)]!
//         const departureDate = new Date(
//             Date.now() + Math.floor(Math.random() * 30) * 24 * 3600 * 1000
//         )
//         const arrivalDate = new Date(
//             departureDate.getTime() +
//                 (Math.floor(Math.random() * 3) + 1) * 24 * 3600 * 1000
//         )
//         const categories = [
//             1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
//             20, 21, 22, 23, 24, 25,
//         ]
//         const sourceId = cities[Math.floor(Math.random() * cities.length)]!
//         let destinationId
//         do {
//             destinationId = cities[Math.floor(Math.random() * cities.length)]!
//         } while (sourceId === destinationId)
//         const types = [
//             'compartment-4',
//             'compartment-6',
//             'aisle-4',
//         ] as ETrainType[]

//         return {
//             id: i,
//             trainId: train.trainId,
//             railroadId: train.railroadId,
//             departureDate: departureDate.toISOString(),
//             arrivalDate: arrivalDate.toISOString(),
//             categoryId:
//                 categories[Math.floor(Math.random() * categories.length)]!,
//             sourceId,
//             destinationId,
//             price: Math.floor(Math.random() * 500 + 100 + Math.random() * 100),
//             quantity: Math.floor(Math.random() * 150),
//             trainType: types[Math.floor(Math.random() * types.length)]!,
//         }
//     })
// }
