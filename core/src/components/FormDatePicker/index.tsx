import React from 'react';
import { alpha, makeStyles, Theme } from '@material-ui/core';
import { DatePicker, DatePickerProps } from '@material-ui/pickers';

const useStyles = makeStyles((theme: Theme) => ({
  InputRoot: {
    margin: '35px 5px 0 5px',
    flex: 1,
    width: '100%',
  },
  shrink: {
    transform: 'translate(14px, 10px) scale(0.75) !important',
  },
  inputRoot: {
    minHeight: 45,
  },
  labelFocused: {
    color: 'unset !important',
  },
  clamp: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    minHeight: 33,
  },
  input: {
    fontSize: 12,
  },
  picker: {
    '& .MuiPickersDay-root.Mui-selected': {
      backgroundColor: theme.palette.secondary.main,
      '&:hover': {
        backgroundColor: alpha(theme.palette.secondary.main, 0.8),
      },
    },
    '& .MuiDialogActions-root': {
      justifyContent: 'center',
      '& button': {
        minWidth: 100,
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
        '&:hover': {
          color: '#fff',
        },
      },
    },
  },
  root: {
    width: '100%',
  },
}));

interface IFormDatePickerProps extends DatePickerProps {}
function FormDatePicker(
  props: IFormDatePickerProps,
  ref: React.Ref<HTMLInputElement>
) {
  const classes = useStyles();

  return (
    <DatePicker
      ref={ref}
      inputVariant="outlined"
      format="P"
      InputProps={{
        className: classes.InputRoot,
        notched: false,
        classes: {
          root: classes.inputRoot,
        },
      }}
      InputLabelProps={{
        shrink: true,
        classes: {
          root: classes.clamp,
          shrink: classes.shrink,
          focused: classes.labelFocused,
        },
      }}
      inputProps={{
        className: classes.input,
      }}
      clearable={false}
      okLabel="انتخاب"
      cancelLabel="بستن"
      className={classes.root}
      {...props}
    />
  );
}

export default React.forwardRef(FormDatePicker);
