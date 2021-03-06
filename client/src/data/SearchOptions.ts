import { cities } from 'containers/home/utils/dummy_data';
import { IdTitleModel, EFlightType, IPassengers } from '@alibaba-clone/core';
import { StateCreator } from 'zustand';

export interface ISearchOptionsSlice {
	flightType: EFlightType;
	setFlightType(v: EFlightType): void;

	source: IdTitleModel;
	setSource(v: IdTitleModel): void;

	destination: IdTitleModel;
	setDestination(v: IdTitleModel): void;

	startDate: Date;
	setStartDate(v: Date): void;

	endDate: Date | null;
	setEndDate(v: Date | null): void;

	passengers: IPassengers;
	setPassengers: (v: IPassengers | ((v: IPassengers) => IPassengers)) => void;
}

const createSearchOptionsSlice: StateCreator<ISearchOptionsSlice> = (set) => ({
	flightType: EFlightType.OneWay,
	setFlightType(v) {
		set({ flightType: v });
	},
	source: cities[0],
	setSource(v) {
		set({ source: v });
	},
	destination: cities[1],
	setDestination(v) {
		set({ destination: v });
	},
	startDate: new Date('2021-08-20T11:44:14.274Z'),
	setStartDate(v) {
		set({ startDate: v });
	},
	endDate: null,
	setEndDate(v) {
		set({ endDate: v });
	},
	passengers: {
		adult: 1,
		child: 0,
		infant: 0,
	},
	setPassengers(v) {
		set((state) => ({
			passengers: typeof v === 'function' ? v(state.passengers) : v,
		}));
	},
});

export default createSearchOptionsSlice;
