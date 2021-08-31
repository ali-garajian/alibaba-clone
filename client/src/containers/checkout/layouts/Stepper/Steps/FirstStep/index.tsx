import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';

import Ticket from 'containers/ticketList/components/Ticket';
import useStore, { ITicketSlice } from 'data/Store';
import { RoutesList } from 'routes/routesList';
import PassengersForm from 'containers/checkout/layouts/PassengersForm';

const ticketSelector = (state: ITicketSlice) => state.selectedTicket;

function FirstStep() {
  const selectedTicket = useStore(ticketSelector);
  const router = useHistory();

  useEffect(() => {
    if (selectedTicket == null) router.replace(RoutesList.TicketList);
  }, []);

  return (
    <Box>
      {selectedTicket && (
        <Ticket
          ticket={selectedTicket}
          defaultExpanded={true}
          action={
            <Button
              variant="outlined"
              color="primary"
              style={{
                minWidth: 150,
              }}
              onClick={() => {
                router.push(RoutesList.TicketList);
              }}
            >
              تغییر بلیط
            </Button>
          }
        />
      )}
      <Box mt={3} />
      <PassengersForm />
    </Box>
  );
}

export default FirstStep;
