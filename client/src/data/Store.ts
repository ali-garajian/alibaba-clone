import create from 'zustand';

import { createStoreApis } from './_utils';
import createSearchOptionsSlice, { ISearchOptionsSlice } from './SearchOptions';
import createSortingSlice, { ISortingSlice } from './Sorting';
import createFiltersSlice, { IFiltersSlice } from './Filters';
import createTicketSlice, { ITicketSlice } from './Ticket';

export type RootState = ISearchOptionsSlice &
  ISortingSlice &
  IFiltersSlice &
  ITicketSlice;

const useStore = create<RootState>((set, get, api) => ({
  ...createSearchOptionsSlice(
    ...createStoreApis<ISearchOptionsSlice>(set, get, api)
  ),
  ...createSortingSlice(...createStoreApis<ISortingSlice>(set, get, api)),
  ...createFiltersSlice(...createStoreApis<IFiltersSlice>(set, get, api)),
  ...createTicketSlice(...createStoreApis<ITicketSlice>(set, get, api)),
}));

export default useStore;

export type { ISearchOptionsSlice, ISortingSlice, IFiltersSlice, ITicketSlice };
