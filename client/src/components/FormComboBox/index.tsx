import React from 'react';
import { Button, makeStyles, Theme } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';

import ComboBox, { ComboEntry, IComboBoxProps } from 'components/ComboBox';

const useStyles = makeStyles((theme: Theme) => ({
  comboBoxLabel: {
    fontSize: 12,
    marginTop: 9,
    color: theme.palette.text.secondary,
  },
  comboBoxRoot: {
    flex: 1,
    width: '100%',
    marginLeft: 5,
    marginRight: 5,
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
    },
    '& input': {
      fontSize: 12,
    },
  },
  autocompleteInputRoot: {
    padding: '4px 6px 4px 16px  !important',
  },
}));

export interface IFormComboBoxProps extends IComboBoxProps {}
const FormComboBox = React.forwardRef(
  (props: IFormComboBoxProps, ref: React.Ref<unknown>) => {
    const classes = useStyles();

    return (
      <ComboBox
        {...props}
        ref={ref}
        classes={{
          root: classes.comboBoxRoot,
          label: classes.comboBoxLabel,
          inputRoot: classes.autocompleteInputRoot,
        }}
      />
    );
  }
);

export default FormComboBox;
