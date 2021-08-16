import { createTheme } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffa500',
    },
  },
  overrides: {
    MuiRadio: {
      root: {
        color: '#fff',
      },
    },
    MuiButton: {
      containedPrimary: {
        color: '#fff',
      },
    },
  },
  direction: 'rtl',
});

export default theme;
