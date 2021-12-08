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
  UsersPage,
  CompaniesPage,
  ManageCompanyUsersPage,
  ManageCompanyOperationsPage,
  ManageCompanyOrdersPage,
  ManageCompanyDelivererPage,
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
      component: ManageCompanyOrdersPage,
      roles: [SUPER_ADMIN, COMMERCIAL_DIRECTOR],
    },
    {
      path: `${user?.company?.id}/${user?.id}/users`,
      label: 'Employés',
      icon: 'la-id-badge',
      component: ManageCompanyUsersPage,
      roles: [SUPER_ADMIN, COMMERCIAL_DIRECTOR],
    },
    {
      path: `${user?.company?.id}/${user?.id}/profile`,
      label: 'Profile',
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
      component: UsersPage,
      roles: [DELIVERER],
    },

    /**
     * Customer part
     */
    {
      path: `${user?.company?.id}/${user?.id}/example`,
      label: 'go to',
      icon: 'la-id-badge',
      component: UsersPage,
      roles: [CUSTOMER],
    },

    /**
     * For all users
     */
    {
      path: `${user?.company?.id}/${user?.id}/profile`,
      label: 'Profile',
      icon: 'la-id-badge',
      component: UsersPage,
      roles: [SECTOR_DELEGATE, DELIVERER],
    },
  ];

  useEffect(() => {
    if (!user) {
      setUserRoutes([]);
      return;
    }
    const filteredRoutes = menuRoutes.filter((route) => {
      return route.roles.includes(user.role.id);
    });
    setUserRoutes(filteredRoutes);
  }, [user]);

  return userRoutes;
}
