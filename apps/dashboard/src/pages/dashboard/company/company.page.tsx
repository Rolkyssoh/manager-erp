import {
  HeaderComponent,
  OrderedPrductCardComponent,
  ProductCardComponent,
} from '../../../components';
import React, { useState } from 'react';
import { RouteProps } from 'react-router';

import './company.styles.scss';

export interface ICompanyPageProps extends RouteProps {
  default_props?: boolean;
}

export const CompanyPage: React.FC<ICompanyPageProps> = () => {
  return (
    <div className="company-container">
      <HeaderComponent />
      <div className="comapny-body">
        <div className="products-side">
          <div className="company-header-container">
            <span className="company-name">Company name</span>
            <span className="company-subtitle">Subtitle</span>
          </div>
          <div className="products-items">
            <div className="nav-menu">
              Menu de navigation test of text align
            </div>
            <div className="render-part">
              <div className="search-bar">Search bar</div>
              <div className="items">
                <ProductCardComponent />
                <ProductCardComponent />
                <ProductCardComponent />
                <ProductCardComponent />
                <ProductCardComponent />
                <ProductCardComponent />
              </div>
            </div>
          </div>
        </div>
        <div className="command-box">
          <div className="box-detail">
            <span className="box-title">Votre commande ici</span>
            <span className="box-subtitle">autre text</span>
          </div>
          <div className="box-body">
            <OrderedPrductCardComponent />
            <OrderedPrductCardComponent />
            <OrderedPrductCardComponent />
            <OrderedPrductCardComponent />
            <OrderedPrductCardComponent />
            <OrderedPrductCardComponent />
          </div>
        </div>
      </div>
    </div>
  );
};
