import React, { useState, } from 'react'
import { RouteProps } from 'react-router'

export interface IBasePageProps extends RouteProps {
  default_props?: boolean
}

export const BasePage: React.FC<IBasePageProps> = () => {

  return (
    <div>
      hello world
    </div>
  )
}
