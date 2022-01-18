import { DefaultButton } from '@fluentui/react';
import {
  DELIVERER,
  SUPER_ADMIN,
  COMMERCIAL_DIRECTOR,
  CUSTOMER,
  IRole,
  SECTOR_DELEGATE,
  ROLES,
} from '@merp/constants';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUserRouteHooks } from '../../hooks';
import { useAuthStore } from './../../stores';

export interface IProfileNavProps {
  default_props?: boolean;
}

export const ProfileNavComponent: React.FC<IProfileNavProps> = () => {
  const menuRoutes = useUserRouteHooks();

  return (
    <nav className="profilenav">
      {/* {menuRoutes.map((_) => (
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
      ))} */}
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          ['profilenav__route', isActive ? 'profilenav__route--current' : null]
            .filter(Boolean)
            .join(' ')
        }
      >
        <i className={'las la-id-badge'}></i>
        <span>Settings</span>
      </NavLink>

      <NavLink
        to="/dashboard/lkdhfjhk"
        className={({ isActive }) =>
          ['profilenav__route', isActive ? 'profilenav__route--current' : null]
            .filter(Boolean)
            .join(' ')
        }
      >
        <i className={'las la-id-badge'}></i>
        <span>Other</span>
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) =>
          ['profilenav__route', isActive ? 'profilenav__route--current' : null]
            .filter(Boolean)
            .join(' ')
        }
      >
        <DefaultButton
          text="Disconnection"
          onClick={() => localStorage.clear()}
          // checked={showingDisabled}
        />
      </NavLink>
    </nav>
  );
};
