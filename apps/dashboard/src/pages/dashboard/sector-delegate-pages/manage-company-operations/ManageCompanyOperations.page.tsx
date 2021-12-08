import React, { useState } from 'react';
import { RouteProps } from 'react-router';

export interface IManageCompanyOperationsProps extends RouteProps {
  default_props?: boolean;
}

export const ManageCompanyOperationsPage: React.FC<IManageCompanyOperationsProps> =
  () => {
    return <div>hello world from manage company operations</div>;
  };
