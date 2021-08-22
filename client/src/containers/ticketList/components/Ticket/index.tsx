import { useState, memo } from 'react';
import {
  Grid,
  Paper,
  Collapse,
  Box,
  Button,
  Typography,
} from '@material-ui/core';
import {
  Flight as FlightIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@material-ui/icons';
import { format } from 'date-fns-jalali';

import { MoneyFormat } from 'utils';
import Conditional from 'components/Conditional';
import useStyles from './styles';
import { ISearchOptionsSlice } from 'data/SearchOptions';
import useStore from 'data/Store';
import TicketCost from '../TicketCost';
import { ETicketType, ITicket } from 'types/models/Ticket';

const passengersSelector = (state: ISearchOptionsSlice) => state.passengers;

interface ITicketProps {
  ticket: ITicket;
  action: React.ReactNode;
  defaultExpanded?: boolean;
}
function Ticket({ ticket, action, defaultExpanded }: ITicketProps) {
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(
    defaultExpanded ?? false
  );
  const passengers = useStore(passengersSelector);

  const classes = useStyles();

  return (
    <Box my={1}>
      <Paper className={classes.rootPaper}>
        <Grid container className={classes.contentCntr}>
          <Grid item xs={9} className={classes.rightCntr}>
            <Box className={classes.ticketType}>
              {
                {
                  [ETicketType.Systematic]: 'سیستمی',
                  [ETicketType.Charters]: 'چارتر',
                }[ticket.ticketType]
              }
            </Box>
            <Box display="flex" p={1}>
              <Box className={classes.airlineCntr} mr={2} ml={3}>
                <img
                  src={ticket.airline.logo}
                  alt={ticket.airline.name}
                  className={classes.airlineLogo}
                />
                <span className={classes.airlineName}>
                  {ticket.airline.name}
                </span>
              </Box>
              <Box flex={1}>
                <div className={classes.planeDesc}>
                  {`${ticket.airplane} - ${
                    ticket.class === 'Buisiness' ? 'بیزینس' : 'اکونومی'
                  }`}
                </div>
                <Box mt={1} />
                <Grid container>
                  <Grid item xs={4} container>
                    <Box fontWeight="bold">
                      {`${ticket.source.title} ${format(
                        new Date(ticket.departureDate),
                        'HH:mm'
                      )}`}
                    </Box>
                  </Grid>
                  <Grid item xs={4} className={classes.flightIllustrationCntr}>
                    <FlightIcon className={classes.flightIcon} />
                    <span className="date">
                      {format(new Date(ticket.departureDate), 'EEEE d MMMM')}
                    </span>
                  </Grid>
                  <Grid item xs={4} container justifyContent="center">
                    <Box fontWeight="bold">
                      {`${ticket.destination.title} ${format(
                        new Date(ticket.arrivalDate),
                        'HH:mm'
                      )}`}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box p={1}>
              <Box textAlign="center">
                <Conditional condition={ticket.quantity !== 0}>
                  <div>
                    <span className={classes.price}>
                      {MoneyFormat(ticket.price * 1000)}
                    </span>
                    <span className={classes.currency}>ریال</span>
                  </div>
                </Conditional>
                <Conditional condition={ticket.quantity === 0}>
                  <Typography
                    color="error"
                    className={classes.unavailableLabel}
                  >
                    تکمیل ظرفیت
                  </Typography>
                </Conditional>
                {action}
                <Box mt={1} />
                <Conditional
                  condition={ticket.quantity > 0 && ticket.quantity <= 10}
                >
                  <Typography
                    color="error"
                    align="center"
                    className={classes.leftTickets}
                  >
                    {ticket.quantity} صندلی باقیمانده
                  </Typography>
                </Conditional>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box
          className={classes.expandButton}
          onClick={() => setShowMoreInfo((p) => !p)}
        >
          اطلاعات بیشتر
          {!showMoreInfo ? (
            <ExpandLessIcon className={classes.expandIcon} />
          ) : (
            <ExpandMoreIcon className={classes.expandIcon} />
          )}
        </Box>
        <Collapse in={showMoreInfo}>
          <Grid container>
            <Grid item xs={9} className={classes.collapseableRightCntr}>
              <Paper elevation={0} className={classes.collapseableRootPaper}>
                <Grid container>
                  <Grid item xs={4}>
                    <div>
                      <span>شماره پرواز : </span>
                      <span>{ticket.id}</span>
                    </div>
                    <Box fontWeight="bold" fontSize={14} my={1}>
                      <span>مقدار بار مجاز : </span>
                      <span>{ticket.permittedLoggage}</span>
                      <span>کیلوگرم</span>
                    </Box>
                    <div>
                      <span>پرواز از ترمینال شماره</span>
                      <span>{ticket.terminalNumber}</span>
                    </div>
                  </Grid>
                  <Grid item xs={8}>
                    <Box display="flex" justifyContent="space-between">
                      <span>{ticket.source.title}</span>
                      <span>{ticket.destination.title}</span>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      fontWeight="bold"
                      fontSize={14}
                      my={1}
                    >
                      <span>
                        {format(new Date(ticket.departureDate), 'HH:mm')}
                      </span>
                      <span>
                        {format(new Date(ticket.arrivalDate), 'HH:mm')}
                      </span>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <span>
                        {format(new Date(ticket.departureDate), 'EEEE d MMMM')}
                      </span>
                      <span>
                        {format(new Date(ticket.arrivalDate), 'EEEE d MMMM')}
                      </span>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Box px="20px">
                <Box fontSize={11}>
                  <TicketCost
                    count={passengers.adult}
                    price={ticket.price}
                    title="بزرگسال"
                  />
                  <Conditional condition={!!passengers.child}>
                    <TicketCost
                      count={passengers.child}
                      price={ticket.price}
                      title="کودک"
                    />
                  </Conditional>
                  <Conditional condition={!!passengers.infant}>
                    <TicketCost
                      count={passengers.infant}
                      price={ticket.price}
                      title="نوزاد"
                    />
                  </Conditional>
                  <Box display="flex" mt={1} className={classes.totalPriceCntr}>
                    <span className="label">مجموع</span>
                    <span className="value">
                      {MoneyFormat(
                        (passengers.adult +
                          passengers.child +
                          passengers.infant) *
                          ticket.price *
                          1000
                      )}{' '}
                      ریال
                    </span>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Collapse>
      </Paper>
    </Box>
  );
}

export default memo(Ticket, (prev, next) => {
  return prev.ticket.id === next.ticket.id;
});
