import { useState } from 'react';
import {
  Box,
  Typography,
  makeStyles,
  Theme,
  Collapse,
  Paper,
} from '@material-ui/core';
import { Flight as FlightIcon, Search as SearchIcon } from '@material-ui/icons';
import shallow from 'zustand/shallow';
import { format } from 'date-fns-jalali';

import useStore, { RootState } from 'data/Store';
import SearchForm from 'containers/home/components/SearchForm';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: '#424242',
    color: '#fff',
    fontSize: 13,
    cursor: 'pointer',
  },
  flightIcon: {
    color: theme.palette.primary.main,
    transform: 'rotate(90deg)',
    marginRight: theme.spacing(1),
  },
  searchCntr: {
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    marginLeft: 5,
  },
  searchFormCntr: {
    background: '#424242',
    '& .search-form-root': {
      position: 'static',
      background: '#424242',
    },
  },
}));

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

interface ISearchFormRibbonProps {}
function SearchFormRibbon({}: ISearchFormRibbonProps) {
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

  const [showSearchForm, setShowSearchForm] = useState<boolean>(false);

  const classes = useStyles();

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={10}
        py={2}
        className={classes.root}
        onClick={() => setShowSearchForm((p) => !p)}
      >
        <Box display="flex" alignItems="center">
          <FlightIcon className={classes.flightIcon} />
          <span>
            بلیط هواپیما {source.title} به {destination.title}
          </span>
          <Box mx={3} />
          <span>رفت {format(startDate, 'EEEE d MMMM')}</span>
        </Box>
        <Typography color="primary" className={classes.searchCntr}>
          تغییر جستجو
          <SearchIcon className={classes.searchIcon} />
        </Typography>
      </Box>
      <Collapse in={showSearchForm}>
        <Box className={classes.searchFormCntr}>
          <SearchForm
            classes={{
              root: 'search-form-root',
            }}
          />
        </Box>
      </Collapse>
    </>
  );
}

export default SearchFormRibbon;
