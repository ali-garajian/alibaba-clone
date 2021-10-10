import { IFlightTicket } from '@alibaba-clone/core';
import { ComboEntry } from '@alibaba-clone/core-ui-web';

export type AddTicketForm = Pick<
	IFlightTicket,
	'airplane' | 'permittedLoggage' | 'terminalNumber' | 'price' | 'quantity'
> &
	Record<
		'ticketType' | 'airline' | 'class' | 'source' | 'destination',
		ComboEntry | null
	> &
	Record<'departureDate' | 'arrivalDate', Date>;
