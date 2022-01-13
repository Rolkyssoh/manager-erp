import React, { useState } from 'react';
import { RouteProps } from 'react-router';

export interface IUserPageProps extends RouteProps {
  default_props?: boolean;
}

export const UserPage: React.FC<IUserPageProps> = () => {
  return <div className="User__page">User page works</div>;
};
