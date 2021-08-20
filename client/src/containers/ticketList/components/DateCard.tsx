import { Box, Typography, makeStyles } from '@material-ui/core';
import { format } from 'date-fns-jalali';

import { MoneyFormat } from 'utils';
import { IDate } from 'types/models/Ticket';

const useStyles = makeStyles({
  date: {
    fontSize: 11,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  currency: {
    fontSize: 10,
  },
});

interface IDateCardProps {
  date: IDate;
}
function DateCard({ date }: IDateCardProps) {
  const classes = useStyles();

  return (
    <Box py={2}>
      <Typography align="center" className={classes.date}>
        {format(new Date(date.date), 'EEEE - d MMMM')}
      </Typography>
      <Typography align="center" className={classes.price}>
        {MoneyFormat(date.price)}
      </Typography>
      <Typography align="center" className={classes.currency}>
        هزار تومان
      </Typography>
    </Box>
  );
}

export default DateCard;
