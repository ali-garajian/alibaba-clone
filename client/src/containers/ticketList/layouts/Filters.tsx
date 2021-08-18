import { Button, Box, Paper } from '@material-ui/core';

import DepartureFilter from '../components/Filters/DepartureFilter';
import TicketTypeFilter from '../components/Filters/TicketTypeFilter';
import AirLinesFilter from '../components/Filters/AirlinesFilter';
import FlightClassFilter from '../components/Filters/FlightClassFilter';
import useStore, { IFiltersSlice } from 'data/Store';

const clearFiltersSelector = (state: IFiltersSlice) => state.clearFilters;

interface IFiltersProps {}
function Filters({}: IFiltersProps) {
  const clearFilters = useStore(clearFiltersSelector);

  return (
    <Box border="1px solid rgba(186,191,199,.3)">
      <Paper elevation={0}>
        <Box p={1} borderBottom="1px solid rgba(186,191,199,.3)">
          <Button variant="outlined" color="primary" onClick={clearFilters}>
            لغو فیلترها
          </Button>
        </Box>
      </Paper>
      <DepartureFilter />
      <TicketTypeFilter />
      <AirLinesFilter />
      <FlightClassFilter />
    </Box>
  );
}

export default Filters;
