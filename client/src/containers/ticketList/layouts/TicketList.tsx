import { Box } from '@material-ui/core';

import Ticket from '../components/Ticket/index';
import { dummy_tickets } from '../../../data/dummy_data/tickets';
import Conditional from 'components/Conditional';
import Sorting from './Sorting';
import EmptyTicketList from './EmptyTicketList';

interface ITicketListProps {}
function TicketList({}: ITicketListProps) {
  const tickets = dummy_tickets;

  // const emptyResult = true;
  const emptyResult = !tickets.length;

  return (
    <Box mt={4}>
      <Conditional condition={emptyResult}>
        <EmptyTicketList />
      </Conditional>

      <Conditional condition={!emptyResult}>
        <Sorting />
        {tickets.map((ticket, i) => (
          <Ticket key={i} ticket={ticket} />
        ))}
      </Conditional>
    </Box>
  );
}

export default TicketList;
