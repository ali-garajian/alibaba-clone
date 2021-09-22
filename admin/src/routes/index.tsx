import { lazy } from 'react';
import { Route, RouteProps, Redirect, Switch } from 'react-router-dom';
import { isAuthenticated } from '@alibaba-clone/core';

import { RoutesList } from './routesList';

const LoginPage = lazy(() => import('containers/login'));
const DashboardPage = lazy(() => import('containers/dashboard'));
const TicketListPage = lazy(() => import('containers/tickets/list'));
const AddTicketPage = lazy(() => import('containers/tickets/add'));

export default function Routes() {
	return (
		<Switch>
			<RestrictedRoute
				exact
				path={RoutesList.Login}
				component={LoginPage}
				isValid={() => !isAuthenticated()}
				redirectTo={RoutesList.Dashboard}
			/>
			<PrivateRoute
				exact
				path={RoutesList.Dashboard}
				component={DashboardPage}
			/>
			<PrivateRoute
				exact
				path={RoutesList.TicketList}
				component={TicketListPage}
			/>
			<PrivateRoute
				exact
				path={RoutesList.AddTicket}
				component={AddTicketPage}
			/>
			<Route path="*">
				{isAuthenticated() ? <DashboardPage /> : <LoginPage />}
			</Route>
		</Switch>
	);
}

function PrivateRoute(props: RouteProps) {
	return (
		<RestrictedRoute
			{...props}
			isValid={() => isAuthenticated()}
			redirectTo={RoutesList.Login}
		/>
	);
}

function RestrictedRoute({
	component: Component,
	isValid,
	redirectTo,
	...rest
}: RouteProps & { isValid(): boolean; redirectTo: RoutesList }) {
	return (
		<Route
			{...rest}
			render={(props) =>
				isValid() ? (
					// @ts-ignore
					<Component {...props} />
				) : (
					<Redirect to={redirectTo} />
				)
			}
		/>
	);
}
