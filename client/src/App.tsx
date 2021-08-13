import { makeStyles } from '@material-ui/core';

import MainWrapper from 'containers/global/MainWrapper';
import { Router } from 'routes';

const useStyles = makeStyles({
  '@global': {
    body: {
      margin: 0,
      '& *': {
        fontFamily: 'IRANSans !important',
        boxSizing: 'border-box',
      },
    },
  },
});

function App() {
  useStyles();

  return (
    <MainWrapper>
      <Router />
    </MainWrapper>
  );
}

export default App;
