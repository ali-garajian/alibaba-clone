import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  contentCntr: {
    height: 120,
  },
  airlineCntr: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 50,
  },
  airlineLogo: {
    width: 48,
    border: '3px solid #fff',
    background: '#fff',
    boxShadow: '-0.5px 0 0 0 #e1e1e1, -0.5px 0 0 1px #e1e1e1',
    borderRadius: '50%',
  },
  airlineName: {
    fontSize: 11,
    color: '#aaa',
    marginTop: 5,
  },
  planeDesc: {
    fontSize: 12,
    color: '#646464',
  },
  flightIcon: {
    fontSize: 18,
    color: '#d2d2d2',
    transform: 'rotate(90deg)',
  },
  flightIllustrationCntr: {
    width: '33%',
    position: 'relative',
    '&::before': {
      content: "''",
      position: 'absolute',
      bottom: 15,
      right: 0,
      width: '100%',
      height: 1,
      borderTop: '1px dashed #d2d2d2',
    },
    '&::after': {
      content: "' '",
      position: 'absolute',
      bottom: 10,
      right: -10,
      width: 10,
      height: 10,
      borderRadius: '50%',
      backgroundColor: '#fff',
      border: '1px solid orange',
    },
    '& .date': {
      position: 'absolute',
      width: '85%',
      textAlign: 'center',
      top: -8,
      fontWeight: 300,
      fontSize: '.7em',
      color: '#aaa',
      opacity: 1,
      transition: 'all .2s ease-in-out',
    },
  },
  rootPaper: {
    position: 'relative',
  },
  expandIcon: {
    fontSize: 12,
  },
  expandButton: {
    fontSize: 11,
    fontWeight: 'bold',
    backgroundColor: '#f9fafe',
    position: 'absolute',
    bottom: 0,
    width: 'calc(100% * 9 / 12 - 1px)',
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  collapseableRootPaper: {
    backgroundColor: '#f9fafe',
    padding: 20,
    paddingBottom: 35,
    color: '#646464',
    fontSize: 13,
  },
  rightCntr: {
    borderRight: '1px dashed #aaa',
  },
  collapseableRightCntr: {
    borderRight: '1px dashed #aaa',
  },
  price: {
    color: '#8bc34a',
    fontSize: '1.5rem',
    paddingRight: 5,
    fontWeight: 'bold',
  },
  currency: {
    fontSize: 12,
    color: '#aaa',
    lineHeight: 1,
  },
  selectTicketBtn: {
    minWidth: 150,
  },
  leftTickets: {
    fontSize: 10,
  },
  unavailableLabel: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  totalPriceCntr: {
    '& .label': {
      color: '#43a047',
      fontSize: 12,
      fontWeight: 'bold',
      marginRight: 5,
    },
    '& .value': {
      fontSize: 12,
      fontWeight: 'bold',
    },
  },
});

export default useStyles;
