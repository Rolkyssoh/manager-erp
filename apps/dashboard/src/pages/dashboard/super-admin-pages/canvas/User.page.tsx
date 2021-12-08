import React, { useState } from 'react';
import { RouteProps } from 'react-router';

export interface IUsersPageProps extends RouteProps {
  default_props?: boolean;
}

export const UsersPage: React.FC<IUsersPageProps> = () => {
  return <div className="Users__page">Users page works</div>;
};
