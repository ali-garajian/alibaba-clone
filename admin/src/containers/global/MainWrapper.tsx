import { useEffect } from 'react';
import { CssBaseline, Box, makeStyles, Theme } from '@material-ui/core';
import shallow from 'zustand/shallow';
import { isAuthenticated } from '@alibaba-clone/core';

import AppProviders from 'providers';
import Appbar from './Appbar';
import Sidebar from './Sidebar/index';
import { IAuthSlice } from 'data/auth';
import useStore from 'data/Store';
import Conditional from 'components/Conditional';

const useStyles = makeStyles((theme: Theme) => ({
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
}));

const isLoggedInSelector = (state: IAuthSlice) =>
	[state.isLoggedIn, state.setIsLoggedIn] as const;

export default function MainWrapper({ children }: React.PropsWithChildren<{}>) {
	const classes = useStyles();

	const [isLoggedIn, setIsLoggedIn] = useStore(isLoggedInSelector, shallow);

	useEffect(() => {
		setIsLoggedIn(isAuthenticated());
	}, []);

	return (
		<AppProviders>
			<CssBaseline />
			<Box display="flex">
				<Conditional condition={isLoggedIn}>
					<Appbar />
					<Sidebar />
				</Conditional>
				<Box
					component="main"
					flexGrow={1}
					p={3}
					display="flex"
					flexDirection="column"
				>
					<Conditional condition={isLoggedIn}>
						<div className={classes.toolbar} />
					</Conditional>
					{children}
				</Box>
			</Box>
		</AppProviders>
	);
}
