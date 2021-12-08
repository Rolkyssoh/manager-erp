import React, { useState } from 'react';
import { Route, RouteProps, Routes, Navigate } from 'react-router';
import { LoginPage, ResetPasswordPage, SignUpPage } from '../..';

export interface IAuthShellPageProps extends RouteProps {
  default_props?: boolean;
}

export const AuthShellPage: React.FC<IAuthShellPageProps> = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="*" element={<Navigate to="login" />} />
      <Route path="reset_password" element={<ResetPasswordPage />} />
    </Routes>
  );
};
