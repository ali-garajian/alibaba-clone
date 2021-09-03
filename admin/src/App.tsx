import { HashRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import MainWrapper from 'containers/global/MainWrapper';
import Router from 'routes';

const useStyles = makeStyles({
  '@global': {
    body: {
      margin: 0,
      backgroundColor: '#fff',
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
    <HashRouter>
      <MainWrapper>
        <Router />
      </MainWrapper>
    </HashRouter>
  );
}

export default App;
