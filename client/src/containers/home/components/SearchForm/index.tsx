import { useState } from 'react';
import { Box, makeStyles, Button } from '@material-ui/core';

import FlightType, { EFlightType } from './FlightType';
import LocationSelectBox from './LocationSelectBox';
import { IdTitleModel } from 'types/base/IdTitleModel';
import { cities } from 'containers/home/utils/dummy_data';
import DateBox from './DateBox';
import PassengerPickerBox, { IPassengers } from './PassengerPickerBox';

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
  searchBtn: {
    minWidth: 200,
    marginLeft: 8,
    color: '#fff',
    fontSize: 16,
  },
});

export default function SearchForm() {
  const classes = useStyles();

  const [flightType, setFlightType] = useState<EFlightType>(EFlightType.OneWay);

  const [source, setSource] = useState<IdTitleModel>(cities[0]);
  const [destination, setDestination] = useState<IdTitleModel>(cities[1]);

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [passengers, setPassengers] = useState<IPassengers>({
    adult: 1,
    child: 0,
    infant: 0,
  });

  return (
    <Box className={classes.root}>
      <Box maxWidth="1200px" m="20px auto">
        <FlightType
          flightType={flightType}
          onChange={(type) => setFlightType(type)}
        />
        <Box display="flex" mt={2}>
          <LocationSelectBox
            source={source}
            onSourceChange={setSource}
            destination={destination}
            onDestinationChange={setDestination}
            onToggle={() => {
              const temp = source;
              setSource(destination);
              setDestination(temp);
            }}
          />
          <DateBox
            startDate={startDate}
            handleStartDateChange={(v) => setStartDate(v ?? new Date())}
            endDate={endDate}
            handleEndDateChange={setEndDate}
            endDateDisabled={flightType === EFlightType.OneWay}
          />
          <PassengerPickerBox
            passengers={passengers}
            setPassengers={setPassengers}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.searchBtn}
          >
            جستجو
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
