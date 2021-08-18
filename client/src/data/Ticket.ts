import { StateCreator } from 'zustand';

import { ITicket } from 'containers/ticketList/components/Ticket';

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
