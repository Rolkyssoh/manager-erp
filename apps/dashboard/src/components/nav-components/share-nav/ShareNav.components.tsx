import { DefaultButton } from '@fluentui/react';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../../stores';

export interface IProfileNavProps {
  default_props?: boolean;
  accessRoutes: INavRoute[];
}

export interface INavRoute {
  path: string;
  icon: string;
  label: string;
  action?: () => void;
  component: any;
}

export const ShareNavComponent: React.FC<IProfileNavProps> = ({
  accessRoutes,
}) => {
  const { updateToken } = useAuthStore();

  const doLogout = () => {
    localStorage.clear();
    updateToken('');
  };

  useEffect(() => {
    console.log({ accessRoutes });
  }, []);

  return (
    <nav className="profilenav">
      {accessRoutes.map((_) => (
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

      <NavLink
        to="/"
        className={({ isActive }) =>
          ['profilenav__route', isActive ? 'profilenav__route--current' : null]
            .filter(Boolean)
            .join(' ')
        }
      >
        <DefaultButton text="Disconnection" onClick={doLogout} />
      </NavLink>
    </nav>
  );
};
