import { SetState, GetState, StoreApi } from 'zustand';

export const createStoreApis = <T extends object>(
  set: SetState<any>,
  get: GetState<any>,
  api: StoreApi<any>
) => [set as SetState<T>, get as GetState<T>, api as StoreApi<T>] as const;
