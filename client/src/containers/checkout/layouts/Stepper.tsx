import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  makeStyles,
  StepIconProps,
  withStyles,
  Theme,
  Paper,
} from '@material-ui/core';
import { Check as CheckIcon, Flight as FlightIcon } from '@material-ui/icons';
import clsx from 'clsx';

const steps = [
  'انتخاب پرواز',
  'مشخصات مسافران',
  'تایید اطلاعات',
  'پرداخت',
  'صدور بلیط',
];

export enum CheckoutSteps {
  PickFlight,
  Passengers,
  Confirmation,
  Payment,
  TicketIssuance,
}

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

const CustomStepConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage: 'linear-gradient(90deg,orange,#8bc34a)',
      height: 3,
      border: 'none',
    },
  },
  completed: {
    '& $line': {
      backgroundImage: 'unset',
      backgroundColor: '#784af4',
    },
  },
  line: {
    borderTop: '2px dashed #d2d2d2',
  },
})(StepConnector);

interface ICheckoutStepperProps {
  step: CheckoutSteps;
}
function CheckoutStepper({ step }: ICheckoutStepperProps) {
  return (
    <Paper>
      <Stepper
        activeStep={step}
        alternativeLabel
        connector={<CustomStepConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );
}

export default CheckoutStepper;
