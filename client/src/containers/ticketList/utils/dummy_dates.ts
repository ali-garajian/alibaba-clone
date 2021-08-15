import { addDays, format } from 'date-fns-jalali';

export interface IDate {
  date: string;
  price: number;
}
export const dummy_dates: Array<IDate> = Array.from(
  { length: 50 },
  (_, i) => i
).map((index) => ({
  date: format(addDays(new Date(), index), 'EEEE - d MMMM'),
  price: Math.round(Math.random() * 2000 + 400),
}));
