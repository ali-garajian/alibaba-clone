import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Container, Button } from '@material-ui/core';

import CheckoutStepper, { CheckoutSteps } from './layouts/Stepper';
import Ticket from 'containers/ticketList/components/Ticket';
import useStore, { ITicketSlice } from 'data/Store';
import { RoutesList } from 'routes/routesList';
import PassengersForm from './layouts/PassengersForm';

const ticketSelector = (state: ITicketSlice) => state.selectedTicket;

interface ICheckoutPageProps {}
function CheckoutPage({}: ICheckoutPageProps) {
  const [activeStep, setActiveStep] = useState<CheckoutSteps>(
    CheckoutSteps.Passengers
  );
  const selectedTicket = useStore(ticketSelector);
  const router = useHistory();

  useEffect(() => {
    if (selectedTicket == null) router.replace(RoutesList.TicketList);
  }, []);

  return (
    <Container maxWidth="lg">
      <Box py={2}>
        <CheckoutStepper step={activeStep} />
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
    </Container>
  );
}

export default CheckoutPage;
