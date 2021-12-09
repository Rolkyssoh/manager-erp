import { SidenavComponent } from '../../../components';
import React from 'react';
import { Navigate, Route, RouteProps, Routes } from 'react-router';
import { useUserRouteHooks } from '../../../hooks';

export interface IDashboardShellPageProps extends RouteProps {
  default_props?: boolean;
}

export const DashboardShellPage: React.FC<IDashboardShellPageProps> = () => {
  const permittedRoutes = useUserRouteHooks();
  console.log({ permittedRoutes });
  return (
    <main className="dashboard__shell">
      <SidenavComponent />
      <section className="dashboard__content">
        <Routes>
          {permittedRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </section>
    </main>
  );
};
