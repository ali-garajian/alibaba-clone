import { useState, useCallback } from 'react';
import shallow from 'zustand/shallow';

import useStore, { ISearchOptionsSlice, ITicketSlice } from 'data/Store';
import _CACHE from 'data/_CACHE';

import TicketsApi from 'service/tickets';

const searchOptionsSelector = (state: ISearchOptionsSlice) =>
  [
    state.source.id,
    state.destination.id,
    state.startDate,
    state.endDate,
    state.passengers.adult,
    state.passengers.child,
    state.passengers.infant,
  ] as const;

const ticketListDataSelector = (state: ITicketSlice) =>
  [state.ticketListData, state.setTicketListData] as const;

export default function useTicketListData() {
  const [source, destination, departureDate, returnDate, adult, child, infant] =
    useStore(searchOptionsSelector, shallow);
  const [ticketListData, setTicketListData] = useStore(
    ticketListDataSelector,
    shallow
  );

  const key = `/tickets?source=${source}&destination=${destination}&departureDate=${departureDate.toDateString()}&returnDate=${returnDate?.toDateString()}&passengers[adult]=${adult}&passengers[child]=${child}&passengers[infant]=${infant}`;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchTicketListData = useCallback(async () => {
    try {
      setIsLoading(true);
      if (_CACHE[key]) {
        setTicketListData(_CACHE[key]);
      } else {
        const response = await TicketsApi.getTicketListData({
          source,
          destination,
          departureDate: departureDate.toISOString(),
          returnDate: returnDate?.toISOString(),
          passengers: {
            adult,
            child,
            infant,
          },
        });
        _CACHE[key] = response;
        setTicketListData(response);
      }
    } catch (e) {
      setError(e.message ?? 'خطایی در برنامه رخ داده است');
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  return {
    ticketListData,
    isLoading,
    error,
    fetchTicketListData,
  };
}
