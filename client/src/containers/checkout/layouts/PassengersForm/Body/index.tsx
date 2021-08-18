import { useState } from 'react';
import {
  makeStyles,
  Paper,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@material-ui/core';
import {
  SubmitHandler,
  UseFormReturn,
  FieldArrayWithId,
  UseFieldArrayReturn,
} from 'react-hook-form';

import useStore, { ISearchOptionsSlice } from 'data/Store';
import { IPassengers } from 'containers/home/components/SearchForm/PassengerPickerBox';
import { ComboEntry } from 'components/ComboBox';
import PassengerInputCard from './PassengerInputCard';
import { IPassengersForm } from '..';
import Conditional from 'components/Conditional';

const useStyles = makeStyles({
  form: {},
  submitAndContinueBtn: {
    minWidth: 250,
  },
});

interface IPassengersFormBodyProps
  extends UseFormReturn<IPassengersForm>,
    Partial<UseFieldArrayReturn<IPassengersForm, 'passengers', 'id'>> {
  fields: FieldArrayWithId<IPassengersForm, 'passengers', 'id'>[];
}
function PassengersFormBody({
  control,
  formState: { errors },
  handleSubmit,
  fields,
  remove,
}: IPassengersFormBodyProps) {
  const classes = useStyles();
  const [termsAndConditionsChecked, setTermsAndConditionsChecked] = useState<{
    value: boolean;
    error?: string;
  }>({ value: false });

  const onSubmit: SubmitHandler<IPassengersForm> = async (data) => {
    if (!termsAndConditionsChecked.value) return;
    console.log('data: ', data);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <PassengerInputCard
          key={field.id}
          {...{ index, control, field, errors, remove }}
        />
      ))}
      <Paper>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={4}
          px={2}
        >
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAndConditionsChecked.value}
                  onChange={(e) =>
                    setTermsAndConditionsChecked({
                      value: e.target.checked,
                      error: !e.target.checked
                        ? 'پذیرفتن قوانین الزامی است'
                        : '',
                    })
                  }
                  color="primary"
                />
              }
              label={
                <Typography color="textSecondary">
                  قوانین سایت و قواننین پرواز را مطالعه کرده ام و آن را تایید می
                  کنم.
                </Typography>
              }
            />
            <Conditional condition={!!termsAndConditionsChecked.error}>
              <Typography color="error" variant="caption" component="div">
                {termsAndConditionsChecked.error}
              </Typography>
            </Conditional>
          </Box>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.submitAndContinueBtn}
          >
            ادامه فرآیند خرید
          </Button>
        </Box>
      </Paper>
    </form>
  );
}

export default PassengersFormBody;
