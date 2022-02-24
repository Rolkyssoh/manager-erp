import { ShareNavComponent } from '../../../components';
import React from 'react';
import { Navigate, Route, RouteProps, Routes } from 'react-router';
import { useProfileRouteHooks } from '../../../hooks';

export interface IUserProfileShellPageProps extends RouteProps {
  default_props?: boolean;
}

export const UserProfileShellPage: React.FC<IUserProfileShellPageProps> =
  () => {
    const accessRoutes = useProfileRouteHooks();
    console.log({ accessRoutes });
    return (
      <div className="user-profile_shell__container">
        <div className="user-profile__nav">
          <ShareNavComponent accessRoutes={accessRoutes} />
        </div>
        <div className="user-profile__content">
          <Routes>
            {accessRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </div>
      </div>
    );
  };
