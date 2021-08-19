import { StateCreator } from 'zustand';

import { ITicket } from 'types/models/Ticket';

export interface ITicketSlice {
  selectedTicket: ITicket | null;
  setSelectedTicket(v: ITicket | null): void;
}

const createTicketSlice: StateCreator<ITicketSlice> = (set) => ({
  selectedTicket: null,
  setSelectedTicket(v) {
    set({ selectedTicket: v });
  },
});

export default createTicketSlice;
