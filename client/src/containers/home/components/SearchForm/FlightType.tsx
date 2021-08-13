import { useState } from 'react';
import {
  Box,
  makeStyles,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    bottom: 0,
    height: '50%',
    background: 'rgba(0,0,0,.7)',
    width: '100%',
    padding: '20px 60px',
    color: '#fff',
  },
  flightTypeCntr: {
    flexDirection: 'row',
  },
});

export enum EFlightType {
  OneWay = 'one-way',
  TwoWay = 'two-way',
}

interface IFlightTypeProps {
  flightType: EFlightType;
  onChange(v: EFlightType): void;
}
function FlightType({ flightType, onChange }: IFlightTypeProps) {
  const classes = useStyles();

  return (
    <RadioGroup
      name="flight-type"
      value={flightType}
      onChange={(e) => onChange(e.target.value as EFlightType)}
      className={classes.flightTypeCntr}
    >
      <FormControlLabel
        value={EFlightType.OneWay}
        control={<Radio color="primary" />}
        label="یک طرفه"
      />
      <FormControlLabel
        value={EFlightType.TwoWay}
        control={<Radio color="primary" />}
        label="دو طرفه"
      />
    </RadioGroup>
  );
}

export default FlightType;
