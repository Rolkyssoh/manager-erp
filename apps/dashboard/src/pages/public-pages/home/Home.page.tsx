import { DefaultButton, PrimaryButton } from '@fluentui/react';
import { LoginDialog } from '../../../dialogs';
import React, { useState } from 'react';
import { RouteProps } from 'react-router';
import { CompanyCardComponent, HeaderComponent } from '../../../components';

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
          <div className="home-action">
            <DefaultButton text="Se connecter" className="home-action-button" />
          </div>

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
        <div>Alimentation près de vous</div>
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
