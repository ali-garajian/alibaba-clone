import { lazy } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { RoutesList } from './routesList';

const HomePage = lazy(() => import('containers/home'));

export function Router() {
  return (
    <HashRouter>
      <Route exact path={RoutesList.Main} component={HomePage} />
    </HashRouter>
  );
}
