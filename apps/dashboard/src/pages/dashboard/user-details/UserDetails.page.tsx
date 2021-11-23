import React, { useState, } from 'react'
import { RouteProps } from 'react-router'

export interface IUserDetailsPageProps extends RouteProps {
  default_props?: boolean
}

export const UserDetailsPage: React.FC<IUserDetailsPageProps> = () => {

  return (
    <div className='UserDetails__page'>
      UserDetails page works
    </div>
  )
}
