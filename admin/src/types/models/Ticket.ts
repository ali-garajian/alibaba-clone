import { ITicket } from '@alibaba-clone/core';
import { ComboEntry } from 'components/ComboBox';

export type AddTicketForm = Pick<
	ITicket,
	'airplane' | 'permittedLoggage' | 'terminalNumber' | 'price' | 'quantity'
> &
	Record<
		'ticketType' | 'airline' | 'class' | 'source' | 'destination',
		ComboEntry | null
	> &
	Record<'departureDate' | 'arrivalDate', Date>;
