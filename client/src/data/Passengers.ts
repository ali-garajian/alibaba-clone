import { StateCreator } from 'zustand';

import { IPassengerInputData } from 'containers/checkout/layouts/PassengersForm';

export interface IPassengersSlice {
  passengersInfo: Array<IPassengerInputData>;
  setPassengersInfo(v: Array<IPassengerInputData>): void;
}

const createPassengersSlice: StateCreator<IPassengersSlice> = (set) => ({
  passengersInfo: [],
  setPassengersInfo(v) {
    set({
      passengersInfo: v,
    });
  },
});

export default createPassengersSlice;
