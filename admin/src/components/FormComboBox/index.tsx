import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

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

function isOptionsDynamic(value: FormComboBoxProps): value is DynamicProps {
  return value && 'useOptions' in value;
}

type DynamicProps = Omit<IComboBoxProps, 'options'> & {
  useOptions(): {
    options: ComboEntry[];
    loading: boolean;
  };
};
export type FormComboBoxProps = IComboBoxProps | DynamicProps;
const FormComboBox = React.forwardRef(
  (props: FormComboBoxProps, ref: React.Ref<unknown>) => {
    const classes = useStyles();

    const { options, loading } = isOptionsDynamic(props)
      ? props.useOptions()
      : { options: props.options, loading: false };

    let actualProps;
    if (isOptionsDynamic(props)) {
      const { useOptions, ...rest } = props;
      actualProps = rest;
    } else {
      const { options, ...rest } = props;
      actualProps = rest;
    }

    return (
      <ComboBox
        {...actualProps}
        ref={ref}
        options={options}
        loading={loading}
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
