import { Box } from '@material-ui/core';

import TicketInfo from './layouts/TicketInfo';
import PassengersInfo from './layouts/PassengersInfo';
import Footer from './layouts/Footer';

function SecondStep() {
  return (
    <Box mt={2}>
      <TicketInfo />
      <Box my={2} />
      <PassengersInfo />
      <Box my={2} />
      <Footer />
    </Box>
  );
}

export default SecondStep;
