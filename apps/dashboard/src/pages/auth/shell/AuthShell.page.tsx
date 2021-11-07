import React, { useState, } from 'react'
import { Route, RouteProps, Routes, Navigate } from 'react-router'
import {
  LoginPage, ResetPasswordPage,
  SignUpPage,

} from '../..'

export interface IAuthShellPageProps extends RouteProps {
  default_props?: boolean
}

export const AuthShellPage: React.FC<IAuthShellPageProps> = () => {

  return (
    <div>
      hello world from auth page
    </div>
  )
}
