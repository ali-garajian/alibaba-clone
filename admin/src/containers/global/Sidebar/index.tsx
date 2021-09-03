import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  ListItemSecondaryAction,
  Collapse,
} from '@material-ui/core';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  KeyboardArrowDown as ChevronDownIcon,
  KeyboardArrowUp as ChevronUpIcon,
} from '@material-ui/icons';
import clsx from 'clsx';
import shallow from 'zustand/shallow';

import useStore, { IApplicationSlice } from 'data/Store';
import { SidebarItems, ISidebarItem } from './utils/items';

export const drawerWidth = 240;

interface IStylesProps {
  isMainDrawerOpen: boolean;
}
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
    chevronDownIcon: {
      display: ({ isMainDrawerOpen }: IStylesProps) =>
        isMainDrawerOpen ? 'block' : 'none',
    },
    subMenuCollapse: {
      backgroundColor: alpha('#000', 0.1),
    },
    subMenuList: {
      padding: 0,
    },
  })
);

const mainDrawerStateSelector = (state: IApplicationSlice) =>
  [state.isMainDrawerOpen, state.setIsMainDrawerOpen] as const;

export default function Sidebar() {
  const [isMainDrawerOpen, setIsMainDrawerOpen] = useStore(
    mainDrawerStateSelector,
    shallow
  );

  const classes = useStyles({ isMainDrawerOpen });
  const theme = useTheme();

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
        {SidebarItems.map((item, index) => (
          <SidebarItem key={index} {...item} classes={classes} />
        ))}
      </List>
    </Drawer>
  );
}

interface ISidebarItemProps extends ISidebarItem {
  classes: ReturnType<typeof useStyles>;
}
function SidebarItem({
  url,
  title,
  icon: Icon,
  children,
  classes,
}: ISidebarItemProps) {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem
        button
        className={classes.link}
        onClick={url ? () => history.push(url) : undefined}
      >
        <ListItemIcon>{Icon ? <Icon /> : null}</ListItemIcon>
        <ListItemText primary={title} />
        {children && (
          <ListItemSecondaryAction>
            <IconButton
              onClick={() => setOpen((p) => !p)}
              className={classes.chevronDownIcon}
            >
              {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
      {children && (
        <Collapse in={open} className={classes.subMenuCollapse}>
          <List className={classes.subMenuList}>
            {children?.map((item, index) => (
              <SidebarItem key={index} {...item} classes={classes} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}
