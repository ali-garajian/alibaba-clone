import { StateCreator } from 'zustand';

import { ITicket } from 'types/models/Ticket';
import { IGetTicketListResponse } from 'types/models/Ticket';
import { ApiResponseContent } from 'service/_base';

export interface ITicketSlice {
  selectedTicket: ITicket | null;
  setSelectedTicket(v: ITicket | null): void;

  ticketListData: ApiResponseContent<IGetTicketListResponse> | null;
  setTicketListData(v: ApiResponseContent<IGetTicketListResponse>): void;
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
