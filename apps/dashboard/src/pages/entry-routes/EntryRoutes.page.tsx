import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import {
  AuthShellPage,
  CompaniesShellPage,
  DashboardShellPage,
  HomePage,
  LoginPage,
  ResetPasswordPage,
  SignUpPage,
  UserProfilePage,
  UserProfileShellPage,
} from '..';

export interface IEntryRoutesPageProps {
  default_props?: boolean;
}

export const EntryRoutesPage: React.FC<IEntryRoutesPageProps> = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="auth/*" element={<AuthShellPage />} />
      <Route path="dashboard/*" element={<DashboardShellPage />} />
      {/* <Route
        path="dashboard/:userCompany/:userId/*"
        element={<UserProfilePage />}
      /> */}
      {/* <Route path="company/*" element={<CompaniesShellPage />} /> */}
      <Route path="company/*" element={<CompaniesShellPage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
