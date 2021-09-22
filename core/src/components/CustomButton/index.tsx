import {
  Button,
  ButtonProps,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  button: {
    color: '#fff',
  },
});

interface ICustomButtonProps extends ButtonProps {
  loading?: boolean;
}
function CustomButton({ loading, children, ...rest }: ICustomButtonProps) {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      {...rest}
      startIcon={
        loading ? (
          <CircularProgress size={20} className={classes.button} />
        ) : null
      }
    >
      {children}
    </Button>
  );
}

export default CustomButton;
