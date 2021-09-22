import { addDays } from 'date-fns-jalali';
import { IDate } from '@alibaba-clone/core';

export const dummy_dates: Array<IDate> = Array.from(
	{ length: 50 },
	(_, i) => i
).map((index) => ({
	date: addDays(new Date(), index).toISOString(),
	price: Math.round(Math.random() * 2000 + 400),
}));
