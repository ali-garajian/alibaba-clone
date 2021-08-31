import { Box, makeStyles, Paper, Theme, Grid, Button } from '@material-ui/core';
import shallow from 'zustand/shallow';

import useStore, { RootState } from 'data/Store';
import { useStepperCtx } from 'containers/checkout/layouts/Stepper/Provider';
import { CheckoutSteps } from 'containers/checkout/layouts/Stepper/_utils';
import { MoneyFormat } from 'utils';

const useStyles = makeStyles((theme: Theme) => ({
  returnBtn: {
    minWidth: 190,
  },
  submitBtn: {
    width: '100%',
  },
  totalPriceLabel: {
    color: theme.palette.text.secondary,
    fontSize: 13,
  },
  totalPrice: {
    color: theme.palette.secondary.main,
    fontSize: 14,
    fontWeight: 'bold',
  },
  currency: {
    color: theme.palette.text.secondary,
    fontSize: 13,
    marginLeft: 5,
  },
}));

const dataSelector = (state: RootState) =>
  [state.passengers, state.selectedTicket] as const;

function TicketInfo() {
  const classes = useStyles();
  const [passengers, ticket] = useStore(dataSelector, shallow);
  const { setActiveStep } = useStepperCtx();

  if (!ticket) return null;

  const totalPrice = MoneyFormat(
    (passengers.adult + passengers.child + passengers.infant) *
      ticket.price *
      1000
  );

  return (
    <Paper elevation={2}>
      <Box px={2} py={4}>
        <Grid container>
          <Grid item xs={9}>
            <Box display="flex" alignItems="flex-end" height="100%">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setActiveStep(CheckoutSteps.Passengers)}
                className={classes.returnBtn}
              >
                بازگشت
              </Button>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={4}
            >
              <span className={classes.totalPriceLabel}>
                مبلغ قابل پرداخت :‌
              </span>
              <span className={classes.totalPrice}>
                {totalPrice}
                <span className={classes.currency}>ریال</span>
              </span>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              className={classes.submitBtn}
            >
              پرداخت آنلاین
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default TicketInfo;
