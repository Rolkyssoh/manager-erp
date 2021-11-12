import React, { useState } from 'react';
import { RouteProps } from 'react-router';
import {
  CompanyCardComponent,
  HeaderComponent,
} from 'apps/dashboard/src/components';

import './home.styles.scss';

export interface IHomePageProps extends RouteProps {
  default_props?: boolean;
}

export const HomePage: React.FC<IHomePageProps> = () => {
  return (
    <div className="homepage">
      <HeaderComponent />
      <div className="homebody">
        <div className="searchzone">
          <span className="home-indication">En Livraison Chez vous </span>
          <div className="search-barre">Search barrer here</div>

          <div className="search-zone-items">
            <div className="company-item">
              <div className="icone-company">Icone here</div>
              <div className="name-company">Name here</div>
            </div>

            <div className="company-item">
              <div className="icone-company">Icone here</div>
              <div className="name-company">Name here</div>
            </div>
            <div className="company-item">
              <div className="icone-company">Icone here</div>
              <div className="name-company">Name here</div>
            </div>
            <div className="company-item">
              <div className="icone-company">Icone here</div>
              <div className="name-company">Name here</div>
            </div>

            <div className="company-item">
              <div className="icone-company">Icone here</div>
              <div className="name-company">Name here</div>
            </div>

            <div className="company-item">
              <div className="icone-company">Icone here</div>
              <div className="name-company">Name here</div>
            </div>
          </div>
        </div>
        <div className="productszone">
          <CompanyCardComponent />
          <CompanyCardComponent />
          <CompanyCardComponent />
          <CompanyCardComponent />
          <CompanyCardComponent />
          <CompanyCardComponent />
        </div>
      </div>
      <div className="footer">Footer</div>
    </div>
  );
};
