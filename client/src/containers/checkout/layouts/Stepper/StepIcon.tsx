import { makeStyles, StepIconProps, Theme } from '@material-ui/core';
import { Check as CheckIcon, Flight as FlightIcon } from '@material-ui/icons';
import clsx from 'clsx';

const useStepIconStyles = makeStyles((theme: Theme) => ({
  flightIcon: {
    color: theme.palette.primary.main,
    transform: 'rotate(90deg)',
    fontSize: 35,
  },
  root: {
    display: 'flex',
    height: 22,
    alignItems: 'center',
    marginTop: 11,
  },
  active: {
    color: '#784af4',
  },
  completed: {
    color: '#fff',
    backgroundColor: '#8bc34a',
    zIndex: 1,
    fontSize: 18,
    border: '1px solid #8bc34a',
    borderRadius: '50%',
    padding: 2,
    boxSizing: 'content-box',
  },
  circle: {
    width: 16,
    height: 16,
    border: '1px solid #d2d2d2',
    borderRadius: '50%',
  },
}));
function CustomStepIcon(props: StepIconProps) {
  const classes = useStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <CheckIcon className={classes.completed} />
      ) : active ? (
        <FlightIcon className={classes.flightIcon} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

export default CustomStepIcon;
