import { cities } from 'containers/home/utils/dummy_data';
import { EFlightClass, ETicketType, ITicket } from 'types/models/Ticket';
import { airlines } from './airlines';

export const dummy_tickets: Array<ITicket> = Array.from(
  { length: 50 },
  (_, i) => i + 1
).map((index) => ({
  id: Math.random().toString(32).substr(2, 8),
  ticketType: index % 2 ? ETicketType.Systematic : ETicketType.Charters,
  airline: airlines[index % airlines.length],
  airplane: 'Boeing 737',
  class: index % 2 ? EFlightClass.Buisiness : EFlightClass.Economy,
  departureDate: new Date().toISOString(),
  arrivalDate: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
  source: cities[index % cities.length],
  destination: cities[index % cities.length],
  permittedLoggage: 25,
  terminalNumber: index % 5,
  price: Math.round(Math.random() * 2000 + 400),
  quantity: Math.floor(Math.random() * 50),
}));
