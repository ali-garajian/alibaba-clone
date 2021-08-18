export function MoneyFormat(value?: number) {
  const money = value && value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '٫');
  return money;
}

export function ZeroFillTime(value: number) {
  return value < 10 ? `0${value}:00` : `${value}:00`;
}
