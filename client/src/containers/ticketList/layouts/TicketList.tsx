import { Box, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import Ticket from '../components/Ticket/index';
import { dummy_tickets } from '../../../data/dummy_data/tickets';
import Conditional from 'components/Conditional';
import Sorting from './Sorting';
import EmptyTicketList from './EmptyTicketList';
import useStore, { ITicketSlice } from 'data/Store';
import { RoutesList } from 'routes/routesList';

const ticketSelector = (state: ITicketSlice) => state.setSelectedTicket;

interface ITicketListProps {}
function TicketList({}: ITicketListProps) {
  const tickets = dummy_tickets;

  const setSelectedTicket = useStore(ticketSelector);
  const router = useHistory();

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
          <Ticket
            key={i}
            ticket={ticket}
            action={
              <Button
                variant="contained"
                color="primary"
                style={{
                  minWidth: 150,
                }}
                disabled={ticket.quantity === 0}
                onClick={() => {
                  setSelectedTicket(ticket);
                  router.push(RoutesList.Checkout);
                }}
              >
                انتخاب بلیط
              </Button>
            }
          />
        ))}
      </Conditional>
    </Box>
  );
}

export default TicketList;
