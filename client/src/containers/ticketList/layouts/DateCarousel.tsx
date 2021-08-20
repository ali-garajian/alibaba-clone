import { useState, useRef, useEffect } from 'react';
import { Paper, Box, makeStyles } from '@material-ui/core';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@material-ui/icons';
import clsx from 'clsx';
import Carousel, { RenderArrowProps } from 'react-elastic-carousel';
import shallow from 'zustand/shallow';
import debounce from 'lodash/debounce';

import DateCard from '../components/DateCard';
import useTicketListData from '../utils/useTicketListData';
import { IDate } from 'types/models/Ticket';
import useStore, { ISearchOptionsSlice } from 'data/Store';
import { useCallback } from 'react';

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
  dateCntr: {
    cursor: 'pointer',
  },
});

const dateSelector = (state: ISearchOptionsSlice) =>
  [state.startDate, state.setStartDate] as const;

interface IDateCarouselProps {}
function DateCarousel({}: IDateCarouselProps) {
  const classes = useStyles();
  const [current, setCurrent] = useState<number>(0);
  const carouselRef = useRef<Carousel | null>(null);
  const { isLoading, error, ticketListData, fetchTicketListData } =
    useTicketListData();
  const [departureDate, setDepartureDate] = useStore(dateSelector, shallow);

  const dates = ticketListData?.data?.dates ?? [];

  useEffect(() => {
    fetchTicketListData();
  }, [departureDate]);

  const debouncedSetDepartureDate = useCallback(
    debounce((date: string) => setDepartureDate(new Date(date)), 600),
    []
  );

  const handleChangeDate = useCallback(({ date }: IDate, index: number) => {
    // @ts-ignore
    carouselRef.current?.goTo(index);
    setCurrent(index);
    debouncedSetDepartureDate(date);
  }, []);

  if (!dates?.length && isLoading) return <div>Loading ...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Paper dir="rtl">
      <Carousel
        ref={carouselRef}
        itemsToShow={7}
        isRTL={true}
        itemsToScroll={1}
        disableArrowsOnEnd
        pagination={false}
        renderArrow={CustomArrow}
        enableSwipe={false}
        itemPadding={[0, 0, 0, 1]}
        onNextStart={(_, next) =>
          handleChangeDate(dates[next.index], next.index)
        }
        onPrevStart={(_, prev) =>
          handleChangeDate(dates[prev.index], prev.index)
        }
      >
        {dates.map((date, index) => (
          <Box
            key={index}
            width="100%"
            border={current === index ? '1px solid black' : 'unset'}
            className={classes.dateCntr}
            onClick={() => handleChangeDate(date, index)}
          >
            <DateCard date={date} />
          </Box>
        ))}
      </Carousel>
    </Paper>
  );
}

export default DateCarousel;
