import { Box, Container } from '@material-ui/core';

import CheckoutStepper from './layouts/Stepper/index';
import FirstStep from './layouts/Stepper/Steps/FirstStep/index';
import SecondStep from './layouts/Stepper/Steps/SecondStep/index';

function CheckoutPage() {
  return (
    <Container maxWidth="lg">
      <Box py={2}>
        <CheckoutStepper>
          <FirstStep />
          <SecondStep />
        </CheckoutStepper>
      </Box>
    </Container>
  );
}

export default CheckoutPage;
