import { Box, makeStyles, alpha } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Event as EventIcon } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns-jalali';
import clsx from 'clsx';

class FaDateFnsUtils extends DateFnsUtils {
  format(date: Date, formatString: string) {
    return format(date, formatString, { locale: this.locale });
  }
}

const useStyles = makeStyles({
  datePicker: {
    background: '#fff',
    width: 145,
    '& .MuiInputBase-root': {
      height: '100%',
      padding: '5px 10px',
      fontSize: 14,
      color: '#646464',
    },
    '& > .Mui-disabled': {
      background: alpha('#000', 0.1),
    },
  },
  startDate: {
    borderRight: '1px solid #aaa',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  endDate: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  startAdornment: {
    fontSize: 20,
    color: '#aaa',
    marginRight: 8,
  },
});

interface IDateBoxProps {
  startDate: Date;
  handleStartDateChange(v: Date | null): void;
  endDate: Date | null;
  handleEndDateChange(v: Date | null): void;
  endDateDisabled: boolean;
}
function DateBox({
  startDate,
  handleStartDateChange,
  endDate,
  handleEndDateChange,
  endDateDisabled,
}: IDateBoxProps) {
  const classes = useStyles();

  return (
    <Box display="flex" mx={1}>
      <MuiPickersUtilsProvider utils={FaDateFnsUtils}>
        <DatePicker
          value={startDate}
          onChange={handleStartDateChange}
          clearable={false}
          variant="inline"
          className={clsx(classes.datePicker, classes.startDate)}
          format="P"
          InputProps={{
            startAdornment: <EventIcon className={classes.startAdornment} />,
          }}
        />
        <DatePicker
          value={endDate}
          onChange={handleEndDateChange}
          variant="inline"
          className={clsx(classes.datePicker, classes.endDate)}
          format="P"
          placeholder="تاریخ برگشت"
          disabled={endDateDisabled}
          InputProps={{
            startAdornment: <EventIcon className={classes.startAdornment} />,
          }}
        />
      </MuiPickersUtilsProvider>
    </Box>
  );
}

export default DateBox;
