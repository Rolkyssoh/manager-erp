import {
  SECTOR_DELEGATE,
  DELIVERER,
  SUPER_ADMIN,
  COMMERCIAL_DIRECTOR,
  CUSTOMER,
} from '@merp/constants';
import { CompaniesDtoIn } from '@merp/dto';
import { ICompany } from '@merp/entities';
import { useEffect, useState } from 'react';
import {
  CompanyProductComponent,
  INavRoute,
  UserComponent,
} from '../components';
import { UsersPage, OrdersPage, UserProfilePage } from '../pages';
import { CompanyService } from '../services';
import { useAuthStore } from '../stores';

export function useCompanyRouteHooks() {
  const [companyRoutes, setCompanyRoutes] = useState<INavRoute[]>([]);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [error, setError] = useState<boolean>(false);

  const { user } = useAuthStore();

  const getallEnableCompanies = async () => {
    CompanyService.get_companies()
      .then((response) => {
        if (response.status !== 200) {
          //@TODO #4
          // alert('error getting companies');
          setError(true);
          return [];
        }

        return response.json();
      })
      .then(({ companies: resCompanies }: CompaniesDtoIn) => {
        console.log('the response:', resCompanies);
        const enableCompanies = resCompanies.filter((_) => !_.disabled);
        setCompanies(enableCompanies);
      })
      .catch((err) => {
        //@TODO #4
        console.log({ err });
        setError(true);
      });
  };

  //   const menuRoutes: INavRoute[] = [
  //     /**
  //      * Product by company
  //      */
  //     {
  //       path: `/company/${company?.id}`,
  //       label: 'Change company',
  //       icon: 'la-id-badge',
  //       component: CompanyProductComponent,
  //     },

  //     /**
  //      * Commercial Director part
  //      */
  //     {
  //       path: `${user?.company?.id}/${user?.id}/orders`,
  //       label: 'Gérer Commandes',
  //       icon: 'la-id-badge',
  //       component: OrdersPage,
  //     },
  //     {
  //       path: `${user?.company?.id}/${user?.id}/users`,
  //       label: 'Employés',
  //       icon: 'la-id-badge',
  //       component: UsersPage,
  //     },
  //   ];
  const menuRoutes: INavRoute[] = companies.map((company) => {
    return {
      path: `company/${company.id}`,
      label: `${company.company_name}`,
      icon: 'la-id-badge',
      component: CompanyProductComponent,
    };
  });

  useEffect(() => {
    setCompanyRoutes(menuRoutes);

    getallEnableCompanies();
  }, [user]);

  return companyRoutes;
}
