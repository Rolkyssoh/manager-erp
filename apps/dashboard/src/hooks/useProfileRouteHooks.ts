import {
  SECTOR_DELEGATE,
  DELIVERER,
  SUPER_ADMIN,
  COMMERCIAL_DIRECTOR,
  CUSTOMER,
} from '@merp/constants';
import { useEffect, useState } from 'react';
import { INavRoute, IRoute } from '../components';
import {
  UserPage,
  CompaniesPage,
  ManageCompanyUsersPage,
  ManageCompanyOperationsPage,
  ManageCompanyOrdersPage,
  ManageCompanyDelivererPage,
  UsersPage,
  OrdersPage,
  UserProfilePage,
} from '../pages';
import { useAuthStore } from '../stores';

export function useProfileRouteHooks() {
  const [profileRoutes, setProfileRoutes] = useState<INavRoute[]>([]);

  const { user } = useAuthStore();

  const menuRoutes: INavRoute[] = [
    /**
     * Admin part
     */
    {
      path: `profile`,
      label: 'Settings',
      icon: 'la-id-badge',
      component: UserProfilePage,
    },

    /**
     * Commercial Director part
     */
    {
      path: `${user?.company?.id}/${user?.id}/orders`,
      label: 'Gérer Commandes',
      icon: 'la-id-badge',
      component: OrdersPage,
    },
    {
      path: `${user?.company?.id}/${user?.id}/users`,
      label: 'Employés',
      icon: 'la-id-badge',
      component: UsersPage,
    },
  ];

  useEffect(() => {
    //    if (!user) {
    //      setProfileRoutes([]);
    //      return;
    //    }
    //    const roleId_currentUser = user.role.id;
    // const filteredRoutes = menuRoutes.filter((route) => {
    //   return route.roles.includes(roleId_currentUser);
    // });
    setProfileRoutes(menuRoutes);
  }, [user]);

  return profileRoutes;
}
