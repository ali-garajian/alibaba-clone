import { cities } from 'containers/home/utils/dummy_data';
import { ETicketType, ITicket } from '../components/Ticket/index';

export const airlines: Array<{ logo: string; name: string }> = [
  {
    logo: '/images/airlines/mahan.png',
    name: 'ماهان',
  },
  {
    logo: '/images/airlines/aseman.png',
    name: 'آسمان',
  },
  {
    logo: '/images/airlines/varesh.png',
    name: 'وارش',
  },
  {
    logo: '/images/airlines/taban.png',
    name: 'تابان',
  },
  {
    logo: '/images/airlines/caspian.png',
    name: 'کاسپین',
  },
];

export const dummy_tickets: Array<ITicket> = Array.from(
  { length: 50 },
  (_, i) => i + 1
).map((index) => ({
  id: Math.random().toString(32).substr(2, 8),
  ticketType: index % 2 ? ETicketType.Systematic : ETicketType.Charters,
  airline: airlines[index % 5],
  airplane: 'Boeing 737',
  class: index % 2 ? 'Buisiness' : 'Economic',
  departureDate: new Date(),
  arrivalDate: new Date(Date.now() + 3 * 60 * 60 * 1000),
  source: cities[index % cities.length],
  destination: cities[index % cities.length],
  permittedLoggage: 25,
  terminalNumber: index % 5,
  price: Math.round(Math.random() * 2000 + 400),
  quantity: Math.floor(Math.random() * 50),
}));
