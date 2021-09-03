import { createTheme } from '@material-ui/core';

const theme = createTheme({
  palette: {},
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
