import React, { useState, } from 'react'
import { Route, RouteProps, Routes, Navigate } from 'react-router'
import {
  LoginPage, ResetPasswordPage,
  SignUpPage,

} from '../..'

export interface IDashboardShellPageProps extends RouteProps {
  default_props?: boolean
}

export const DashboardShellPage: React.FC<IDashboardShellPageProps> = () => {

  return (
    <div>
      hello world from dashboard page
        {/* <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} /> */}
    </div>
  )
}
