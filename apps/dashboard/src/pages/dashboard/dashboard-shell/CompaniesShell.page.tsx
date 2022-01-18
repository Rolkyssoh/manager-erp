import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { CompanyPage } from '../..';

export interface ICompaniesShellPageProps {
  default_props?: boolean;
}

export const CompaniesShellPage: React.FC<ICompaniesShellPageProps> = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<HomePage />} />
      <Route path="auth/*" element={<AuthShellPage />} /> */}
      <Route path="/:companyId" element={<CompanyPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
