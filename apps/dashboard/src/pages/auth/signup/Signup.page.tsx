import React, { useState, } from 'react'
import { RouteProps } from 'react-router'

export interface ISignUpPageProps extends RouteProps {
  default_props?: boolean
}

export const SignUpPage: React.FC<ISignUpPageProps> = () => {

  return (
    <div>
      hello world from signup page
    </div>
  )
}
