import create from 'zustand';

import { createStoreApis } from './_utils';
import createApplicationSlice, { IApplicationSlice } from './application';
import createAuthSlice, { IAuthSlice } from './auth';

export type RootState = IApplicationSlice & IAuthSlice;

const useStore = create<RootState>((set, get, api) => ({
  ...createApplicationSlice(
    ...createStoreApis<IApplicationSlice>(set, get, api)
  ),
  ...createAuthSlice(...createStoreApis<IAuthSlice>(set, get, api)),
}));

export default useStore;

export type { IApplicationSlice, IAuthSlice };
