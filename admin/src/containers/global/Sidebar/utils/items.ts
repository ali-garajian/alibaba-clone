import { Dashboard as DashboardIcon } from '@material-ui/icons';

import { RoutesList } from 'routes/routesList';

interface ISidebarItem {
  title: string;
  url: RoutesList;
  icon: React.ComponentType;
}

export const SidebarItems: ISidebarItem[] = [
  {
    title: 'صفحه اصلی',
    url: RoutesList.Dashboard,
    icon: DashboardIcon,
  },
];
