import { Box, Container, Grid } from '@material-ui/core';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import SearchFormRibbon from './layouts/SearchFormRibbon';
import DateCarousel from './layouts/DateCarousel';
import TicketList from './layouts/TicketList';
import Filters from './layouts/Filters';

export default function TicketListPage() {
  return (
    <Box>
      <SearchFormRibbon />
      <Container maxWidth="lg">
        <Box mt={2}>
          <Grid container spacing={1}>
            <Grid item xs={12} lg={3}>
              <Filters />
            </Grid>
            <Grid item xs={12} lg={9}>
              <DateCarousel />
              <TicketList />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
