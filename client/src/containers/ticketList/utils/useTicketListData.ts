import { useState, useCallback, useEffect } from 'react';
import shallow from 'zustand/shallow';
import debounce from 'lodash/debounce';

import useStore, {
  ISearchOptionsSlice,
  ITicketSlice,
  RootState,
} from 'data/Store';
import _CACHE from 'data/_CACHE';
import TicketsApi from 'service/tickets';
import { ESortingCriterias } from 'data/Sorting';
import { ITicket } from 'types/models/Ticket';

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

export const filtersAndSortsSelector = (state: RootState) =>
  [
    state.departure,
    state.ticketTypes,
    state.airlines,
    state.flightClasses,
    state.sortingCriteria,
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
  const filtersAndSorts = useStore(filtersAndSortsSelector, shallow);

  const key = `/tickets?source=${source}&destination=${destination}&departureDate=${departureDate.toDateString()}&returnDate=${returnDate?.toDateString()}&passengers[adult]=${adult}&passengers[child]=${child}&passengers[infant]=${infant}`;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchTicketListData = useCallback(async () => {
    try {
      setIsLoading(true);
      const cached = _CACHE[key];
      if (cached) {
        const tickets = applyFiltersAndSorts({
          tickets: cached.data?.tickets,
          filtersAndSorts,
        });
        setTicketListData({
          ...cached,
          data: {
            dates: cached.data?.dates ?? [],
            tickets,
          },
        });
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
        const tickets =
          applyFiltersAndSorts({
            tickets: response.data?.tickets,
            filtersAndSorts,
          }) ?? [];
        setTicketListData({
          ...response,
          data: {
            dates: response.data?.dates ?? [],
            tickets,
          },
        });
      }
    } catch (e: any) {
      setError(e.message ?? 'خطایی در برنامه رخ داده است');
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  // TODO: refactor this function ... it's heavy af. make it so that only changed filters are applied
  const applyFiltersAndSorts = useCallback(
    ({
      tickets,
      filtersAndSorts,
    }: {
      tickets?: ITicket[];
      filtersAndSorts: any;
    }) => {
      if (!tickets) return;

      const [departure, ticketTypes, airlines, flightClasses, sortingCriteria] =
        filtersAndSorts;

      const checkedTicketTypes = Object.entries(ticketTypes)
        .filter(([, value]) => value)
        .map(([type]) => type);

      const checkedFlightClasses = Object.entries(flightClasses)
        .filter(([, value]) => value)
        .map(([flightClass]) => flightClass);

      const temp = tickets
        .filter(
          (t) =>
            new Date(t.departureDate).getHours() >= departure[0] &&
            new Date(t.departureDate).getHours() <= departure[1] &&
            (airlines.length ? airlines.includes(t.airline.id) : true) &&
            (checkedTicketTypes.length
              ? checkedTicketTypes.includes(t.ticketType)
              : true) &&
            (checkedFlightClasses.length
              ? checkedFlightClasses.includes(t.class)
              : true)
        )
        .sort((t1, t2) => {
          switch (sortingCriteria.value) {
            case ESortingCriterias.Default: {
              return t1.id - t2.id;
            }

            case ESortingCriterias.Departure: {
              return sortingCriteria.direction.departure === 'ASC'
                ? new Date(t1.departureDate).getTime() -
                    new Date(t2.departureDate).getTime()
                : new Date(t2.departureDate).getTime() -
                    new Date(t1.departureDate).getTime();
            }

            case ESortingCriterias.Price: {
              return sortingCriteria.direction.price === 'ASC'
                ? t1.price - t2.price
                : t2.price - t1.price;
            }

            default:
              throw new Error(
                'you forgot to check for a sorting criteria dummy!'
              );
          }
        });

      return temp;
    },
    []
  );

  const applyFiltersOnChange = useCallback(
    debounce((filtersAndSorts: any) => {
      const cached = _CACHE[key];

      if (!cached) return;

      const tickets =
        applyFiltersAndSorts({
          tickets: cached.data?.tickets,
          filtersAndSorts,
        }) ?? [];
      setTicketListData({
        ...cached,
        data: {
          dates: cached.data?.dates ?? [],
          tickets,
        },
      });
    }, 400),
    []
  );

  return {
    ticketListData,
    isLoading,
    error,
    fetchTicketListData,
    applyFiltersOnChange,
  };
}
