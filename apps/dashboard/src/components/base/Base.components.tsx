import React, { useState, } from 'react'
import { DefaultButton } from '@fluentui/react'

export interface IBaseProps {
  default_props?: boolean
}

export const BaseComponent: React.FC<IBaseProps> = () => {

  return (
    <div>
      hello world
    </div>
  )
}
