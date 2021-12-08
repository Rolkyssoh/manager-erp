import React, { useState } from 'react';
import { RouteProps } from 'react-router';

export interface IManageCompanyOrdersProps extends RouteProps {
  default_props?: boolean;
}

export const ManageCompanyOrdersPage: React.FC<IManageCompanyOrdersProps> =
  () => {
    return (
      <div className="ManageCompanyOrders__page">
        Manage Company Orders page works
      </div>
    );
  };
