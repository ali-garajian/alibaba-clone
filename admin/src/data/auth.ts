import { StateCreator } from 'zustand';

export interface IAuthSlice {
  isLoggedIn: boolean;
  setIsLoggedIn(v: boolean): void;
}

const createAuthSlice: StateCreator<IAuthSlice> = (set) => ({
  isLoggedIn: false,
  setIsLoggedIn(v) {
    set({
      isLoggedIn: v,
    });
  },
});

export default createAuthSlice;
