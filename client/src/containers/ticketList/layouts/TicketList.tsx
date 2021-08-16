import { Box } from '@material-ui/core';

import Ticket from '../components/Ticket/index';
import { dummy_tickets } from '../utils/dummy_tickets';

interface ITicketListProps {}
function TicketList({}: ITicketListProps) {
  const tickets = dummy_tickets;

  return (
    <Box mt={4}>
      {tickets.map((ticket, i) => (
        <Ticket key={i} ticket={ticket} />
      ))}
    </Box>
  );
}

export default TicketList;
