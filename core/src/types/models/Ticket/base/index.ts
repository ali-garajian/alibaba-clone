import {
    IFlightTicket,
    FlightTicketTableRepresentation,
    DbFlightTicketModel,
} from './Flight'
import {
    ITrainTicket,
    TrainTicketTableRepresentation,
    DbTrainTicketModel,
} from './Train'

export * from './_base'
export * from './Flight'
export * from './Train'

export type Ticket = IFlightTicket | ITrainTicket
export type TicketTableRepresentation =
    | FlightTicketTableRepresentation
    | TrainTicketTableRepresentation
export type DbTicketModel = DbFlightTicketModel | DbTrainTicketModel
