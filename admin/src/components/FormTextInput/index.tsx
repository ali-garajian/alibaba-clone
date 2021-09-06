import React from 'react';
import { TextField, TextFieldProps, makeStyles } from '@material-ui/core';
import {
  useController,
  UseControllerProps,
  FieldValues,
  FieldPath,
} from 'react-hook-form';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    marginTop: 35,
    width: '100%',
    '& input, textarea': {
      fontSize: 12,
    },
  },
  shrink: {
    transform: 'translate(6px, -25px) scale(0.75) !important',
  },
  inputRoot: {
    height: 40,
  },
  labelFocused: {
    color: 'unset !important',
  },
  labelRoot: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    minHeight: 33,
  },
  input: {},
});

export interface IFormTextInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends UseControllerProps<TFieldValues, TName> {
  label?: string | React.ReactElement;
  classes?: Partial<ReturnType<typeof useStyles>>;
  textFieldProps?: TextFieldProps;
}
export default function FormTextInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  label,
  classes: externalClasses,
  textFieldProps,
  ...rest
}: IFormTextInputProps<TFieldValues, TName>) {
  const classes = useStyles();
  const {
    field: { ref, value, ...inputProps },
  } = useController<TFieldValues, TName>({
    ...rest,
  });

  return (
    <TextField
      {...textFieldProps}
      label={label}
      variant="outlined"
      classes={{
        root: clsx(classes.root, externalClasses?.root),
      }}
      InputLabelProps={{
        shrink: true,
        classes: {
          root: clsx(classes.labelRoot, externalClasses?.labelRoot),
          shrink: classes.shrink,
          focused: classes.labelFocused,
        },
      }}
      InputProps={{
        notched: false,
        classes: {
          root: classes.inputRoot,
        },
      }}
      value={value ?? ''}
      inputProps={{
        css: externalClasses?.input,
      }}
      {...inputProps}
    />
  );
}
