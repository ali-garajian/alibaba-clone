import {
  Dashboard as DashboardIcon,
  ConfirmationNumber as ConfirmationNumberIcon,
} from '@material-ui/icons';

import { RoutesList } from 'routes/routesList';

export interface ISidebarItem {
  title: string;
  url?: RoutesList;
  icon?: React.ComponentType;
  children?: ISidebarItem[];
}

export const SidebarItems: ISidebarItem[] = [
  {
    title: 'صفحه اصلی',
    url: RoutesList.Dashboard,
    icon: DashboardIcon,
  },
  {
    title: 'بلیط',
    icon: ConfirmationNumberIcon,
    children: [
      {
        title: 'لیست بلیط ها',
        url: RoutesList.TicketList,
      },
      {
        title: 'افزودن بلیط',
        url: RoutesList.AddTicket,
      },
    ],
  },
];
