import React, { useState } from 'react';
import { Route, RouteProps, Routes, Navigate } from 'react-router';
import {
  HomePage,
  CompanyPage,
  LoginPage,
  ResetPasswordPage,
  SignUpPage,
} from '../..';

export interface IDashboardShellPageProps extends RouteProps {
  default_props?: boolean;
}

export const DashboardShellPage: React.FC<IDashboardShellPageProps> = () => {
  return (
    <div>
      {/* hello world from dashboard page */}
      {/*
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} /> */}
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="home" element={<HomePage />} />
        <Route path="company" element={<CompanyPage />} />
      </Routes>
    </div>
  );
};
