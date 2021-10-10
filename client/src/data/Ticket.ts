import { StateCreator } from 'zustand';
import {
	IFlightTicket,
	IGetClientTicketListResponse,
	ApiResponseContent,
} from '@alibaba-clone/core';

export interface ITicketSlice {
	selectedFlightTicket: IFlightTicket | null;
	setSelectedFlightTicket(v: IFlightTicket | null): void;

	flightTicketListData: ApiResponseContent<
		IGetClientTicketListResponse<IFlightTicket>
	> | null;
	setFlightTicketListData(
		v: ApiResponseContent<IGetClientTicketListResponse<IFlightTicket>>
	): void;
}

const createTicketSlice: StateCreator<ITicketSlice> = (set) => ({
	selectedFlightTicket: null,
	setSelectedFlightTicket(v) {
		set({ selectedFlightTicket: v });
	},

	flightTicketListData: null,
	setFlightTicketListData(v) {
		set({ flightTicketListData: v });
	},
});

export default createTicketSlice;
