import create from 'zustand';

import { createStoreApis } from './_utils';
import createSearchOptionsSlice, { ISearchOptionsSlice } from './SearchOptions';

export type RootState = ISearchOptionsSlice;

const useStore = create<RootState>((set, get, api) => ({
  ...createSearchOptionsSlice(
    ...createStoreApis<ISearchOptionsSlice>(set, get, api)
  ),
}));

export default useStore;

export type {};
