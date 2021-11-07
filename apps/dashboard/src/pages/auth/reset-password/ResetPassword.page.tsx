import React, { useState, } from 'react'
import { RouteProps } from 'react-router'

export interface IResetPasswordPageProps extends RouteProps {
  default_props?: boolean
}

export const ResetPasswordPage: React.FC<IResetPasswordPageProps> = () => {

  return (
    <div>
      hello world from reset password page
    </div>
  )
}
