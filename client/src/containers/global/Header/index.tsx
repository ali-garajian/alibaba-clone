import { Paper, Box, Typography, makeStyles, Button } from '@material-ui/core';
import { useState } from 'react';

import AuthenticationModal from './AuthenticationModal';

const useStyles = makeStyles({
  logo: {
    width: 50,
  },
  logoText: {
    height: 15,
  },
  authenticateBtn: {
    dispaly: 'flex',
    alignItems: 'center',
  },
});

export default function Header() {
  const classes = useStyles();
  const [authenticationModalOpen, setAuthenticationModalOpen] =
    useState<boolean>(false);

  return (
    <>
      <Paper>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={10}
          height={65}
        >
          <Box display="flex" alignItems="center">
            <img src="/images/logo.svg" className={classes.logo} />
            <Box display="flex" flexDirection="column" mt="5px">
              <img src="/images/logo-text.svg" className={classes.logoText} />
              <Box mt="5px" />
              <Typography variant="caption">خرید بلیط، هتل، تور</Typography>
            </Box>
          </Box>
          <Box>
            <Button
              className={classes.authenticateBtn}
              onClick={() => setAuthenticationModalOpen(true)}
            >
              <Typography variant="button" color="textSecondary">
                ورود - ثبت نام
              </Typography>
              <Box mx="5px" />
              <img src="/icons/user.svg" />
            </Button>
          </Box>
        </Box>
      </Paper>
      <AuthenticationModal
        open={authenticationModalOpen}
        onClose={() => setAuthenticationModalOpen(false)}
      />
    </>
  );
}
