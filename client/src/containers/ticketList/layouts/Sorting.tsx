import { Box, Paper, Tabs, Tab, makeStyles } from '@material-ui/core';
import shallow from 'zustand/shallow';

import { ESortingCriterias, ISortingSlice, SortDirection } from 'data/Sorting';
import useStore from 'data/Store';
import SortAscendingIcon from 'icons/SortAscendingIcon';
import SortDescendingIcon from 'icons/SortDescendingIcon';

const useStyles = makeStyles({
  icon: {
    fontSize: 16,
  },
  tabsContainer: {
    justifyContent: 'center',
  },
});

const sortingSelector = (state: ISortingSlice) =>
  [state.sortingCriteria, state.setSortingCriteria] as const;

interface SortingProps {}
function Sorting({}: SortingProps) {
  const [sorting, setSorting] = useStore(sortingSelector, shallow);
  const classes = useStyles();

  function TabLabel({ title, dir }: { title: string; dir?: SortDirection }) {
    const icon =
      dir === 'DESC' ? (
        <SortDescendingIcon className={classes.icon} />
      ) : (
        <SortAscendingIcon className={classes.icon} />
      );

    return (
      <Box display="flex" alignItems="center">
        {icon}
        <Box ml="5px" />
        <span>{title}</span>
      </Box>
    );
  }

  return (
    <Box mt={1}>
      <Paper>
        <Tabs
          value={sorting.value}
          indicatorColor="primary"
          textColor="primary"
          onChange={(_, newValue) => {
            setSorting((p) => ({ ...p, value: newValue }));
          }}
          classes={{
            flexContainer: classes.tabsContainer,
          }}
        >
          <Tab label="پیش فرض" value={ESortingCriterias.Default} />
          <Tab
            label={<TabLabel title="قیمت" dir={sorting.direction?.price} />}
            value={ESortingCriterias.Price}
            onClick={() => {
              if (sorting.value === ESortingCriterias.Price) {
                setSorting((p) => ({
                  ...p,
                  direction: {
                    ...p.direction,
                    price: p.direction?.price === 'ASC' ? 'DESC' : 'ASC',
                  },
                }));
              }
            }}
          />
          <Tab
            label={
              <TabLabel title="ساعت حرکت" dir={sorting.direction?.departure} />
            }
            value={ESortingCriterias.Departure}
            onClick={() => {
              if (sorting.value === ESortingCriterias.Departure) {
                setSorting((p) => ({
                  ...p,
                  direction: {
                    ...p.direction,
                    departure:
                      p.direction?.departure === 'ASC' ? 'DESC' : 'ASC',
                  },
                }));
              }
            }}
          />
        </Tabs>
      </Paper>
    </Box>
  );
}

export default Sorting;
