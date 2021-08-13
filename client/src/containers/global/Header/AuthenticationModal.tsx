import { useState } from 'react';
import {
  Modal,
  Box,
  IconButton,
  TextField,
  Button,
  Typography,
  makeStyles,
  Divider,
  Paper,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '40vw',
    height: '50vh',
    position: 'relative',
  },
  title: {
    fontWeight: 'bold',
  },
  submitBtn: {
    minWidth: 150,
  },
  divider: {
    width: '50%',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

interface IInput {
  value: string;
  error?: string;
}

interface IAuthenticationModalProps {
  open: boolean;
  onClose: VoidFunction;
}
export default function AuthenticationModal({
  open,
  onClose,
}: IAuthenticationModalProps) {
  const classes = useStyles();

  const [username, setUsername] = useState<IInput>({
    value: '',
  });
  const [password, setPassword] = useState<IInput>({
    value: '',
  });

  function handleAuthneticate() {}

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <Paper className={classes.content}>
        <IconButton className={classes.closeIcon} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Box mx={10} my={6}>
          <Typography variant="h5" align="center" className={classes.title}>
            ورود / ثبت نام علی بابا
          </Typography>
          <Box my={1}>
            <Typography
              variant="subtitle2"
              align="center"
              color="textSecondary"
            >
              لطفا برای ادامه نام کاربری و رمز عبور خود را وارد نمایید
            </Typography>
          </Box>
          <Divider />
          <Box mt={5} />
          <TextField
            label="نام کاربری"
            fullWidth
            value={username.value}
            error={!!username.error}
            helperText={username.error}
            variant="outlined"
            onChange={(e) =>
              setUsername({
                value: e.target.value,
                error: !e.target.value
                  ? 'لطفا نام کاربری خود را وارد نمایید'
                  : '',
              })
            }
          />
          <Box mt={2} />
          <TextField
            label="رمز عبور"
            fullWidth
            value={password.value}
            error={!!password.error}
            helperText={password.error}
            variant="outlined"
            onChange={(e) =>
              setPassword({
                value: e.target.value,
                error: !e.target.value
                  ? 'لطفا رمز عبور خود را وارد نمایید'
                  : '',
              })
            }
          />
          <Box mt={4} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAuthneticate}
              className={classes.submitBtn}
            >
              ادامه
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
}
