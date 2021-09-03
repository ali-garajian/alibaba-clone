import { Link } from 'react-router-dom';
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  alpha,
} from '@material-ui/core';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@material-ui/icons';
import clsx from 'clsx';
import shallow from 'zustand/shallow';

import useStore, { IApplicationSlice } from 'data/Store';
import { SidebarItems } from './utils/items';

export const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    link: {
      textDecoration: 'none',
      color: alpha('#000', 0.85),
    },
  })
);

const mainDrawerStateSelector = (state: IApplicationSlice) =>
  [state.isMainDrawerOpen, state.setIsMainDrawerOpen] as const;

export default function Sidebar() {
  const classes = useStyles();
  const theme = useTheme();

  const [isMainDrawerOpen, setIsMainDrawerOpen] = useStore(
    mainDrawerStateSelector,
    shallow
  );

  const handleDrawerClose = () => {
    setIsMainDrawerOpen(false);
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isMainDrawerOpen,
        [classes.drawerClose]: !isMainDrawerOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isMainDrawerOpen,
          [classes.drawerClose]: !isMainDrawerOpen,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {SidebarItems.map(({ url, title, icon: Icon }, index) => (
          <Link to={url} className={classes.link}>
            <ListItem button key={index}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}
