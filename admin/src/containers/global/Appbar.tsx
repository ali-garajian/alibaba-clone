import React, { useState } from 'react';
import {
	alpha,
	makeStyles,
	Theme,
	createStyles,
} from '@material-ui/core/styles';
import {
	AppBar,
	CircularProgress,
	Toolbar,
	Menu,
	MenuItem,
	Typography,
	IconButton,
} from '@material-ui/core';
import {
	Menu as MenuIcon,
	AccountCircle,
	MoreVert as MoreIcon,
} from '@material-ui/icons';
import shallow from 'zustand/shallow';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { AuthApi, isAuthenticated } from '@alibaba-clone/core';

import { RoutesList } from 'routes/routesList';
import Gap from 'components/Gap';
import { IApplicationSlice } from 'data/application';
import useStore, { IAuthSlice } from 'data/Store';
import { drawerWidth } from './Sidebar';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
		appBarShift: {
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		hide: {
			display: 'none',
		},
		title: {
			display: 'none',
			[theme.breakpoints.up('sm')]: {
				display: 'block',
			},
		},
		search: {
			position: 'relative',
			borderRadius: theme.shape.borderRadius,
			backgroundColor: alpha(theme.palette.common.white, 0.15),
			'&:hover': {
				backgroundColor: alpha(theme.palette.common.white, 0.25),
			},
			marginRight: theme.spacing(2),
			marginLeft: 0,
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				marginLeft: theme.spacing(3),
				width: 'auto',
			},
		},
		searchIcon: {
			padding: theme.spacing(0, 2),
			height: '100%',
			position: 'absolute',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		inputRoot: {
			color: 'inherit',
		},
		inputInput: {
			padding: theme.spacing(1, 1, 1, 0),
			// vertical padding + font size from searchIcon
			paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('md')]: {
				width: '20ch',
			},
		},
		sectionDesktop: {
			display: 'none',
			[theme.breakpoints.up('md')]: {
				display: 'flex',
			},
		},
		sectionMobile: {
			display: 'flex',
			[theme.breakpoints.up('md')]: {
				display: 'none',
			},
		},
	})
);

const mainDrawerStateSelector = (state: IApplicationSlice) =>
	[state.isMainDrawerOpen, state.setIsMainDrawerOpen] as const;

const authSelector = (state: IAuthSlice) => state.setIsLoggedIn;

export default function Appbar() {
	const history = useHistory();
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
		useState<null | HTMLElement>(null);

	const [loading, setLoading] = useState(false);

	const [isMainDrawerOpen, setIsMainDrawerOpen] = useStore(
		mainDrawerStateSelector,
		shallow
	);
	const setIsLoggedIn = useStore(authSelector);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	function handleOpenSidebar() {
		setIsMainDrawerOpen(true);
	}

	async function handleLogout() {
		try {
			setLoading(true);
			await AuthApi.logout();
			setIsLoggedIn(isAuthenticated());
			history.push(RoutesList.Login);
		} catch (e: any) {
			const msg = e.message ?? e.msg ?? 'خطایی در سیستم رخ داده است';
			alert(msg);
		} finally {
			setLoading(false);
		}
	}

	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			id="primary-search-account-menu"
			keepMounted
			transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose} button>
				مشاهده حساب کاربری
			</MenuItem>
			<MenuItem onClick={handleLogout} button>
				{loading ? <CircularProgress size={20} /> : null} خروج
			</MenuItem>
		</Menu>
	);

	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id="primary-search-account-menu-mobile"
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton color="inherit">
					<AccountCircle />
				</IconButton>
				<p>حساب کاربری</p>
			</MenuItem>
		</Menu>
	);

	return (
		<>
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: isMainDrawerOpen,
				})}
			>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						className={clsx(classes.menuButton, {
							[classes.hide]: isMainDrawerOpen,
						})}
						onClick={handleOpenSidebar}
					>
						<MenuIcon />
					</IconButton>
					<Typography className={classes.title} variant="h6" noWrap>
						پنل ادمین علی بابا
					</Typography>
					<Gap />
					<div className={classes.sectionDesktop}>
						<IconButton
							edge="end"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton onClick={handleMobileMenuOpen} color="inherit">
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</>
	);
}
