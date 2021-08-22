import { useCallback } from 'react';
import { Box, makeStyles, Theme, Slider } from '@material-ui/core';
import {
  Brightness6 as TwilightIcon,
  Brightness5 as SunIcon,
  Brightness3 as MoonIcon,
} from '@material-ui/icons';
import shallow from 'zustand/shallow';

import CustomAccordion from 'components/CustomAccordion';
import LtrProvider from 'providers/LtrThemeProvider';
import { ZeroFillTime } from 'utils';
import useStore, { IFiltersSlice } from 'data/Store';

const useStyles = makeStyles((theme: Theme) => ({
  iconContainer: {
    '& svg': {
      fontSize: 18,
    },
    '& .sun, .twilight': {
      color: theme.palette.primary.main,
    },
    '& .moon': {
      color: '#64b5f6',
    },
  },
}));

const departureRangeSelector = (state: IFiltersSlice) =>
  [state.departure, state.setDeparture] as const;

interface IDepartureFilterProps {}
function DepartureFilter({}: IDepartureFilterProps) {
  const classes = useStyles();
  const [value, setValue] = useStore(departureRangeSelector, shallow);

  const handleChange = useCallback(
    (_: React.ChangeEvent<{}>, newValue: number | number[]) => {
      if (typeof newValue === 'number') {
        return;
      }

      setValue(newValue);
    },
    []
  );

  return (
    <CustomAccordion title="ساعت حرکت">
      <Box
        flex={1}
        display="flex"
        justifyContent="space-between"
        mb={2}
        className={classes.iconContainer}
      >
        <MoonIcon className="moon" />
        <SunIcon className="sun" />
        <TwilightIcon className="twilight" />
      </Box>
      <LtrProvider>
        <Slider
          step={1}
          min={5}
          max={24}
          value={value}
          onChange={handleChange}
        />
      </LtrProvider>
      <Box
        flex={1}
        display="flex"
        justifyContent="space-between"
        color="#646464"
        fontSize={14}
      >
        <span>{ZeroFillTime(value[1])}</span>
        <span>{ZeroFillTime(value[0])}</span>
      </Box>
    </CustomAccordion>
  );
}

export default DepartureFilter;
