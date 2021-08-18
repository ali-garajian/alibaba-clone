import {
  EFlightClass,
  ETicketType,
} from 'containers/ticketList/components/Ticket';
import { StateCreator } from 'zustand';

export interface IFiltersSlice {
  departure: number[];
  setDeparture(v: number[]): void;

  ticketTypes: Record<ETicketType, boolean>;
  setTicketTypes(name: string, value: boolean): void;

  airlines: number[];
  setAirlines(id: number): void;

  flightClasses: Record<EFlightClass, boolean>;
  setFlightClasses(name: string, value: boolean): void;

  clearFilters: VoidFunction;
}

const createFiltersSlice: StateCreator<IFiltersSlice> = (set) => ({
  departure: [5, 24],
  setDeparture(v) {
    set({
      departure: v,
    });
  },

  ticketTypes: {
    systematic: false,
    charters: false,
  },
  setTicketTypes(name, value) {
    set((state) => ({
      ticketTypes: {
        ...state.ticketTypes,
        [name]: value,
      },
    }));
  },

  airlines: [],
  setAirlines(id) {
    set((state) => {
      let temp = [...state.airlines];
      const index = temp.indexOf(id);
      if (index > -1) {
        temp = temp.filter((i) => i !== id);
      } else {
        temp.push(id);
      }

      return {
        airlines: temp,
      };
    });
  },

  flightClasses: {
    Buisiness: false,
    Economy: false,
  },
  setFlightClasses(name, value) {
    set((state) => ({
      flightClasses: {
        ...state.flightClasses,
        [name]: value,
      },
    }));
  },

  clearFilters() {
    set({
      departure: [5, 24],
      ticketTypes: {
        systematic: false,
        charters: false,
      },
      airlines: [],
      flightClasses: {
        Buisiness: false,
        Economy: false,
      },
    });
  },
});

export default createFiltersSlice;
