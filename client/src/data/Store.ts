import create from 'zustand';

import { createStoreApis } from './_utils';
import createSearchOptionsSlice, { ISearchOptionsSlice } from './SearchOptions';
import createSortingSlice, { ISortingSlice } from './Sorting';

export type RootState = ISearchOptionsSlice & ISortingSlice;

const useStore = create<RootState>((set, get, api) => ({
  ...createSearchOptionsSlice(
    ...createStoreApis<ISearchOptionsSlice>(set, get, api)
  ),
  ...createSortingSlice(...createStoreApis<ISortingSlice>(set, get, api)),
}));

export default useStore;

export type { ISearchOptionsSlice, ISortingSlice };
