import { IRole } from '@merp/constants';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUserRouteHooks } from '../../hooks';
import { useAuthStore } from './../../stores';

export interface ISidenavProps {
  default_props?: boolean;
}

export interface IRoute {
  path: string;
  icon: string;
  label: string;
  action?: () => void;
  component: any;
  roles: IRole[];
}

export const SidenavComponent: React.FC<ISidenavProps> = () => {
  const menuRoutes = useUserRouteHooks();

  return (
    <nav className="sidenav">
      {menuRoutes.map((_) => (
        <NavLink
          key={_.path}
          to={_.path}
          className={({ isActive }) =>
            ['sidenav__route', isActive ? 'sidenav__route--current' : null]
              .filter(Boolean)
              .join(' ')
          }
        >
          <i className={'las ' + _.icon}></i>
          <span>{_.label}</span>
        </NavLink>
      ))}
      {/* <NavLink
        to="/dashboard/iow982-2oi2-3092-09sd0922/users/dwiwod"
        className={({ isActive }) =>
          ['sidenav__route', isActive ? 'sidenav__route--current' : null]
            .filter(Boolean)
            .join(' ')
        }
      >
        <i className={'las la-id-badge'}></i>
        <span>Private user details</span>
      </NavLink> */}
    </nav>
  );
};
