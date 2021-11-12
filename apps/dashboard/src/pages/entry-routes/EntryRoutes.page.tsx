import React, { useState } from 'react';
import { Navigate, Route, RouteProps, Routes } from 'react-router';
import {
  AuthShellPage,
  DashboardShellPage,
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
      {/* <Route path="auth/*" element={<AuthShellPage />} /> */}
      {/* <Route path="auth" element={<Navigate to="login" />} /> */}
      <Route path="dashboard/*" element={<DashboardShellPage />} />
    </Routes>
  );
};
