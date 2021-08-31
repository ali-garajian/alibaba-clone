import { createTheme } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffa500',
    },
    secondary: {
      main: '#8bc34a',
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
      containedSecondary: {
        color: '#fff',
      },
    },
  },
  direction: 'rtl',
});

export default theme;
