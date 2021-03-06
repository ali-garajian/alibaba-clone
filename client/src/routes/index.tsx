import { lazy } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { RoutesList } from './routesList';

const HomePage = lazy(() => import('containers/home'));
const TicketListPage = lazy(() => import('containers/ticketList'));
const CheckoutPage = lazy(() => import('containers/checkout'));

export function Router() {
  return (
    <HashRouter>
      <Route exact path={RoutesList.Main} component={HomePage} />
      <Route path={RoutesList.TicketList} component={TicketListPage} />
      <Route path={RoutesList.Checkout} component={CheckoutPage} />
    </HashRouter>
  );
}
