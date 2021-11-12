import React, { useState } from 'react';
import { Route, RouteProps, Routes, Navigate } from 'react-router';
import { LoginPage, ResetPasswordPage, SignUpPage } from '../..';

export interface IAuthShellPageProps extends RouteProps {
  default_props?: boolean;
}

export const AuthShellPage: React.FC<IAuthShellPageProps> = () => {
  return (
    <>
      <div>hello world from authShell page</div>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        {/* <Route path="*" element={<NotFound />}/> */}
        <Route path="reset_password" element={<ResetPasswordPage />} />
      </Routes>
    </>
  );
};
