import { Box } from '@material-ui/core';

import { MoneyFormat } from 'utils';

interface ITicketCostProps {
  count: number;
  price: number;
  title: string;
}
function TicketCost({ count, price, title }: ITicketCostProps) {
  return (
    <Box display="flex">
      <span>{title}</span>
      <Box mr="5px" />
      <span>
        <span style={{ fontSize: '80%', fontWeight: 'bold' }}>&#x2715;</span>
        {count}
      </span>
      <Box mr="5px" />
      <span>{MoneyFormat(count * price * 1000)} ریال</span>
    </Box>
  );
}

export default TicketCost;
