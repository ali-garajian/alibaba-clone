import { StateCreator } from 'zustand';
import { ITicket, IGetClientTicketListResponse } from '@alibaba-clone/core';

import { ApiResponseContent } from 'service/_base';

export interface ITicketSlice {
	selectedTicket: ITicket | null;
	setSelectedTicket(v: ITicket | null): void;

	ticketListData: ApiResponseContent<IGetClientTicketListResponse> | null;
	setTicketListData(v: ApiResponseContent<IGetClientTicketListResponse>): void;
}

const createTicketSlice: StateCreator<ITicketSlice> = (set) => ({
	selectedTicket: null,
	setSelectedTicket(v) {
		set({ selectedTicket: v });
	},

	ticketListData: null,
	setTicketListData(v) {
		set({ ticketListData: v });
	},
});

export default createTicketSlice;
