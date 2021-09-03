import { lazy } from 'react';
import { Route, RouteProps, Redirect, Switch } from 'react-router-dom';

import { RoutesList } from './routesList';
import { isAuthenticated } from 'utils';

const LoginPage = lazy(() => import('containers/login'));
const DashboardPage = lazy(() => import('containers/dashboard'));

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