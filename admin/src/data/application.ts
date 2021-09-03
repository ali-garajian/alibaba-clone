import { StateCreator } from 'zustand';

export interface IApplicationSlice {
  isMainDrawerOpen: boolean;
  setIsMainDrawerOpen(v: boolean): void;
}

const createApplicationSlice: StateCreator<IApplicationSlice> = (set) => ({
  isMainDrawerOpen: false,
  setIsMainDrawerOpen(v) {
    set({
      isMainDrawerOpen: v,
    });
  },
});

export default createApplicationSlice;
