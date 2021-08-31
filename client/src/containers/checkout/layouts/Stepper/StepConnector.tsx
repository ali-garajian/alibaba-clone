import { StepConnector, withStyles } from '@material-ui/core';

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
      backgroundImage: 'none',
      backgroundColor: '#8bc34a',
      height: 3,
      border: 'none',
    },
  },
  line: {
    borderTop: '2px dashed #d2d2d2',
  },
})(StepConnector);

export default CustomStepConnector;
