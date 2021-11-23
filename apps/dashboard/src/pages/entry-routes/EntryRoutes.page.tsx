import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import {
  AuthShellPage,
  DashboardShellPage,
  HomePage,
  LoginPage,
  ResetPasswordPage,
  SignUpPage,
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
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
