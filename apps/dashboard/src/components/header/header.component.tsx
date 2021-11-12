import React from 'react';

import './header.styles.scss';

export interface IHeaderProps {
  default_props?: boolean;
}

export const HeaderComponent: React.FC<IHeaderProps> = () => {
  return (
    <div className="header">
      <div className="brand">Logo</div>
      <div className="first-search-bar">search bar</div>
      <div className="menu-item">Menu</div>
    </div>
  );
};
