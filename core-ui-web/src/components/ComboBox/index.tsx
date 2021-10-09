/* eslint-disable no-use-before-define */
import React, { ReactNode, useState } from 'react';
import {
  Box,
  CircularProgress,
  Fade,
  Paper,
  Popper,
  PopperProps,
  Typography,
  TextField,
  TextFieldProps,
  alpha,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import clsx from 'clsx';

export interface ComboEntry {
  id: number;
  title: string;
}

export interface IComboBoxProps {
  value: ComboEntry | null | undefined;
  onChange: (event: any, newValue: ComboEntry | null) => void;
  label?: string;
  options: Array<ComboEntry>;
  loading?: boolean;
  className?: string;
  actions?: ReactNode;
  disableDefaultArrow?: boolean;
  inputProps?: TextFieldProps;
  placeholder?: string;
  classes?: Partial<ReturnType<typeof useStyles>>;
}

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    fontSize: 14,
  },
  popup: {
    border: '1px solid #cbcbcb',
    borderTopWidth: 0,
    margin: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  disableDefaultArrow: {
    '& .MuiOutlinedInput-adornedEnd': {
      paddingRight: '16px !important',
    },
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    '& fieldset': {
      borderRadius: 20,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomWidth: '0 !important',
    },
  },
  selectedItem: {
    backgroundColor: `${alpha(theme.palette.secondary.main, 0.2)} !important`,
  },
  root: {},
  inputRoot: {},
}));

const ComboBox = React.forwardRef(
  (props: IComboBoxProps, ref: React.Ref<unknown>) => {
    const {
      value,
      onChange,
      options,
      label,
      loading,
      className,
      actions,
      disableDefaultArrow,
      placeholder,
      inputProps,
      classes: externalClasses,
    } = props;

    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Box className={externalClasses?.root}>
        {label && (
          <Box pr={'14px'} pl={'14px'} pb={1}>
            <Typography className={clsx(externalClasses?.label, classes.label)}>
              {label}
            </Typography>
          </Box>
        )}
        <Autocomplete
          id="combo-box-demo"
          ref={ref}
          noOptionsText="پیدا نشد"
          options={options}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          PopperComponent={ComboBoxPopper}
          className={className}
          loading={loading}
          value={value ?? { id: -1, title: '' }}
          loadingText="در  حال جستجو..."
          onChange={onChange}
          classes={{
            paper: classes.popup,
            inputRoot: clsx(externalClasses?.inputRoot, classes.inputRoot),
          }}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField
              className={clsx(classes.input, {
                [classes.inputOpen]: isOpen,
                [classes.disableDefaultArrow]: disableDefaultArrow,
              })}
              {...params}
              inputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
                ...params.inputProps,
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {!disableDefaultArrow && params.InputProps.endAdornment}
                    {actions}
                  </React.Fragment>
                ),
              }}
              placeholder={placeholder}
              variant="outlined"
              {...inputProps}
            />
          )}
          disableClearable
          autoHighlight
          blurOnSelect
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
        />
      </Box>
    );
  }
);

export default ComboBox;

function ComboBoxPopper({ children, ...props }: PopperProps) {
  return (
    <Popper {...props} placement="bottom" transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>{children}</Paper>
        </Fade>
      )}
    </Popper>
  );
}
