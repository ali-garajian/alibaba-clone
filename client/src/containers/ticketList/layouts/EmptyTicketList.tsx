import { Paper, Box, Button, Typography, makeStyles } from '@material-ui/core';

import useStore, { IFiltersSlice } from 'data/Store';

const useStyles = makeStyles({
  clearFiltersBtn: {
    minWidth: 250,
  },
});

const clearFiltersSelector = (state: IFiltersSlice) => state.clearFilters;

export default function EmptyTicketList() {
  const classes = useStyles();
  const clearFilters = useStore(clearFiltersSelector);

  return (
    <Paper>
      <Box textAlign="center" py={5}>
        <img src="/images/empty-list.svg" />
        <Box mt={5} />
        <Typography color="primary" align="center">
          هیچ پروازی وجود ندارد که مطابق با معیارهای جستجوی شما باشد.
        </Typography>
        <Box mt={3} />
        <Typography color="textSecondary" align="center">
          لطفا فیلترهای انتخاب شده را تغییر دهید و دوباره جستجو کنید
        </Typography>
        <Box mt={3} />
        <Button
          variant="outlined"
          color="primary"
          className={classes.clearFiltersBtn}
          onClick={clearFilters}
        >
          لغو فیلترها
        </Button>
      </Box>
    </Paper>
  );
}
