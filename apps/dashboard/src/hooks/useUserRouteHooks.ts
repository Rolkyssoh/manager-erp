import {
  SECTOR_DELEGATE,
  DELIVERER,
  SUPER_ADMIN,
  COMMERCIAL_DIRECTOR,
  CUSTOMER,
} from '@merp/constants';
import { useEffect, useState } from 'react';
import { IRoute } from '../components';
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

export function useUserRouteHooks() {
  const [userRoutes, setUserRoutes] = useState<IRoute[]>([]);

  const { user } = useAuthStore();

  const menuRoutes: IRoute[] = [
    /**
     * Admin part
     */
    {
      path: `compagnies`,
      label: 'Entreprises',
      icon: 'la-id-badge',
      component: CompaniesPage,
      roles: [SUPER_ADMIN],
    },

    /**
     * Commercial Director part
     */
    {
      path: `${user?.company?.id}/${user?.id}/orders`,
      label: 'Gérer Commandes',
      icon: 'la-id-badge',
      component: OrdersPage,
      roles: [SUPER_ADMIN, COMMERCIAL_DIRECTOR],
    },
    {
      path: `${user?.company?.id}/${user?.id}/users`,
      label: 'Employés',
      icon: 'la-id-badge',
      component: UsersPage,
      roles: [SUPER_ADMIN, COMMERCIAL_DIRECTOR],
    },
    // Pr0Gr@mm@T10n
    /**
     * Sector Delegate part
     */
    {
      path: `${user?.company?.id}/${user?.id}/sectors`,
      label: 'Opérations',
      icon: 'la-id-badge',
      component: ManageCompanyOperationsPage,
      roles: [SECTOR_DELEGATE],
    },
    {
      path: `${user?.company?.id}/${user?.id}/deliverers`,
      label: 'Livreurs',
      icon: 'la-id-badge',
      component: ManageCompanyDelivererPage,
      roles: [SECTOR_DELEGATE],
    },

    /**
     * Deliverer part
     */
    {
      path: `${user?.company?.id}/${user?.id}/example`,
      label: 'Gestion Livraisons',
      icon: 'la-id-badge',
      component: UserPage,
      roles: [DELIVERER],
    },

    /**
     * Customer part
     */
    {
      path: `${user?.company?.id}/${user?.id}/example`,
      label: 'go to',
      icon: 'la-id-badge',
      component: UserPage,
      roles: [CUSTOMER],
    },

    /**
     * For all users
     */
    {
      path: `${user?.company?.id}/${user?.id}/profile`,
      label: 'Profile',
      icon: 'la-id-badge',
      component: UserProfilePage,
      roles: [SUPER_ADMIN, COMMERCIAL_DIRECTOR, SECTOR_DELEGATE, DELIVERER],
    },
  ];

  useEffect(() => {
    if (!user) {
      setUserRoutes([]);
      return;
    }
    const roleId_currentUser = user.role.id;
    const filteredRoutes = menuRoutes.filter((route) => {
      return route.roles.includes(roleId_currentUser);
    });
    setUserRoutes(filteredRoutes);
  }, [user]);

  return userRoutes;
}
