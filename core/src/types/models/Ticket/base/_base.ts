export enum EFlightType {
    OneWay = 'one-way',
    TwoWay = 'two-way',
}
export enum ETicketCategory {
    Flight = 'flight',
    Train = 'train',
}

export interface IPassengers {
    adult: number
    child: number
    infant: number
}
export interface IDate {
    date: string
    price: number
}

export interface ICommonTicketRoutePathParams {
    type: ETicketCategory
}
