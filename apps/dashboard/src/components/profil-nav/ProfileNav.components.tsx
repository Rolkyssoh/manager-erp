import { DefaultButton } from '@fluentui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useProfileRouteHooks, useUserRouteHooks } from '../../hooks';
import { useAuthStore } from './../../stores';

export interface IProfileNavProps {
  default_props?: boolean;
}

export interface IProfileRoute {
  path: string;
  icon: string;
  label: string;
  action?: () => void;
  component: any;
}

export const ProfileNavComponent: React.FC<IProfileNavProps> = () => {
  const subMenuRoutes = useProfileRouteHooks();

  return (
    <nav className="profilenav">
      {subMenuRoutes.map((_) => (
        <NavLink
          key={_.path}
          to={_.path}
          className={({ isActive }) =>
            [
              'profilenav__route',
              isActive ? 'profilenav__route--current' : null,
            ]
              .filter(Boolean)
              .join(' ')
          }
        >
          <i className={'las ' + _.icon}></i>
          <span>{_.label}</span>
        </NavLink>
      ))}
      {/* <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          ['profilenav__route', isActive ? 'profilenav__route--current' : null]
            .filter(Boolean)
            .join(' ')
        }
      >
        <i className={'las la-id-badge'}></i>
        <span>Settings</span>
      </NavLink> */}

      {/* <NavLink
        to="/dashboard/lkdhfjhk"
        className={({ isActive }) =>
          ['profilenav__route', isActive ? 'profilenav__route--current' : null]
            .filter(Boolean)
            .join(' ')
        }
      >
        <i className={'las la-id-badge'}></i>
        <span>Other</span>
      </NavLink> */}

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
