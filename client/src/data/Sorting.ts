import { StateCreator } from 'zustand';

export enum ESortingCriterias {
  Default = 1,
  Price,
  Departure,
}
export type SortDirection = 'ASC' | 'DESC';
export interface ISortingCriteria {
  value: ESortingCriterias;
  direction: {
    price: SortDirection;
    departure: SortDirection;
  };
}

export interface ISortingSlice {
  sortingCriteria: ISortingCriteria;
  setSortingCriteria(
    v: ISortingCriteria | ((v: ISortingCriteria) => ISortingCriteria)
  ): void;
}

const createSortingSlice: StateCreator<ISortingSlice> = (set) => ({
  sortingCriteria: {
    value: ESortingCriterias.Default,
    direction: {
      price: 'ASC',
      departure: 'ASC',
    },
  },
  setSortingCriteria(v) {
    set((state) => ({
      sortingCriteria: typeof v === 'function' ? v(state.sortingCriteria) : v,
    }));
  },
});

export default createSortingSlice;
