import { useEffect } from 'react';
import { Box, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import Ticket from '../components/Ticket/index';
import Conditional from 'components/Conditional';
import Sorting from './Sorting';
import EmptyTicketList from './EmptyTicketList';
import useStore, { ITicketSlice } from 'data/Store';
import { RoutesList } from 'routes/routesList';
import useTicketListData, {
  filtersAndSortsSelector,
} from '../utils/useTicketListData';
import shallow from 'zustand/shallow';

const ticketSelector = (state: ITicketSlice) => state.setSelectedTicket;

interface ITicketListProps {}
function TicketList({}: ITicketListProps) {
  const {
    isLoading,
    error,
    ticketListData,
    fetchTicketListData,
    applyFiltersOnChange,
  } = useTicketListData();

  const setSelectedTicket = useStore(ticketSelector);
  const filtersAndSorts = useStore(filtersAndSortsSelector, shallow);

  const router = useHistory();

  useEffect(() => {
    applyFiltersOnChange(filtersAndSorts);
  }, filtersAndSorts);

  useEffect(() => {
    fetchTicketListData();
  }, []);

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>{error}</div>;

  const tickets = ticketListData?.data?.tickets ?? [];
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
            key={ticket.id}
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
