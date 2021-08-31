export const steps = [
  'انتخاب پرواز',
  'مشخصات مسافران',
  'تایید اطلاعات',
  'پرداخت',
  'صدور بلیط',
];

export enum CheckoutSteps {
  PickFlight = 0,
  Passengers,
  Confirmation,
  Payment,
  TicketIssuance,
}
