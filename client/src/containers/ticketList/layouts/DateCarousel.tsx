import { Paper, Box, makeStyles } from '@material-ui/core';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@material-ui/icons';
import clsx from 'clsx';
import Carousel, { RenderArrowProps } from 'react-elastic-carousel';
import DateCard from '../components/DateCard';
import { dummy_dates } from '../utils/dummy_dates';

const useArrowStyles = makeStyles({
  arrowIcon: {
    color: '#000',
  },

  disabled: {
    '& *': {
      pointerEvents: 'none',
      filter: 'grayscale(1) opacity(0.5)',
    },
  },
});

function NextArrow({ onClick, isEdge }: Omit<RenderArrowProps, 'type'>) {
  const classes = useArrowStyles();

  return (
    <Box
      display="flex"
      alignItems="center"
      onClick={onClick}
      borderLeft="1px solid #f5f5f5"
      className={clsx({
        [classes.disabled]: isEdge,
      })}
    >
      <ChevronLeftIcon className={classes.arrowIcon} />
    </Box>
  );
}
function PrevArrow({ onClick, isEdge }: Omit<RenderArrowProps, 'type'>) {
  const classes = useArrowStyles();

  return (
    <Box
      display="flex"
      alignItems="center"
      onClick={onClick}
      borderRight="1px solid #f5f5f5"
      className={clsx({
        [classes.disabled]: isEdge,
      })}
    >
      <ChevronRightIcon className={classes.arrowIcon} />
    </Box>
  );
}

function CustomArrow({ type, ...rest }: RenderArrowProps) {
  return type === 'PREV' ? <PrevArrow {...rest} /> : <NextArrow {...rest} />;
}

const useStyles = makeStyles({
  '@global': {
    '.rec-carousel': {
      height: 90,
    },
    '.rec-item-wrapper': {
      borderLeft: '1px solid #f5f5f5',
      height: '100%',
    },
    '.rec-carousel-item': {
      height: '100%',
    },
    '.rec-slider-container': {
      marginLeft: '0 !important',
    },
  },
});

interface IDateCarouselProps {}
function DateCarousel({}: IDateCarouselProps) {
  useStyles();

  const dates = dummy_dates;

  return (
    <Paper dir="rtl">
      <Carousel
        itemsToShow={7}
        isRTL={true}
        itemsToScroll={1}
        disableArrowsOnEnd
        pagination={false}
        renderArrow={CustomArrow}
        enableSwipe={false}
        itemPadding={[0, 0, 0, 1]}
      >
        {dates.map((date, index) => (
          <DateCard key={index} date={date} />
        ))}
      </Carousel>
    </Paper>
  );
}

export default DateCarousel;
