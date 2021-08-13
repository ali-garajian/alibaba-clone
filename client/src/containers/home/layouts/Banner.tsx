import { Box, makeStyles } from '@material-ui/core';

import SearchForm from '../components/SearchForm/index';

const useStyles = makeStyles({
  root: {
    backgroundImage: 'url(/images/flight-bg.jpg)',
    height: 420,
    position: 'relative',
  },
});

export default function Banner() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <SearchForm />
    </Box>
  );
}
