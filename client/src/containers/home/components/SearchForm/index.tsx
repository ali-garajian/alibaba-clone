import { Box, makeStyles, Button } from '@material-ui/core';
import shallow from 'zustand/shallow';
import clsx from 'clsx';

import FlightType from './FlightType';
import LocationSelectBox from './LocationSelectBox';
import DateBox from './DateBox';
import PassengerPickerBox from './PassengerPickerBox';
import useStore, { RootState } from 'data/Store';
import { EFlightType, IPassengers } from 'types/models/Ticket';
import useTicketListData from 'containers/ticketList/utils/useTicketListData';
import { useEffect } from 'react';

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

const searchOptionsSelector = (state: RootState) =>
  [
    state.flightType,
    state.setFlightType,
    state.source,
    state.setSource,
    state.destination,
    state.setDestination,
    state.startDate,
    state.setStartDate,
    state.endDate,
    state.setEndDate,
    state.passengers,
    state.setPassengers,
  ] as const;

interface ISearchFormProps {
  classes?: Partial<ReturnType<typeof useStyles>>;
}
export default function SearchForm({
  classes: externalClasses,
}: ISearchFormProps) {
  const classes = useStyles();

  const [
    flightType,
    setFlightType,
    source,
    setSource,
    destination,
    setDestination,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    passengers,
    setPassengers,
  ] = useStore(searchOptionsSelector, shallow);

  const { isLoading, fetchTicketListData } = useTicketListData();

  return (
    <Box className={clsx(externalClasses?.root, classes.root)}>
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
            disabled={isLoading}
            onClick={fetchTicketListData}
          >
            جستجو
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
