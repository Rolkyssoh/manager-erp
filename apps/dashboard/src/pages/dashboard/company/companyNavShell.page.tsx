import {
  CompanyProductComponent,
  ShareNavComponent,
} from '../../../components';
import React, { useEffect } from 'react';
import { Navigate, Route, RouteProps, Routes } from 'react-router';
import { useCompanyRouteHooks } from '../../../hooks';
import { IProduct } from '@merp/entities';

export interface ICompanyNavShellPageProps extends RouteProps {
  default_props?: boolean;
  productToDisplay: IProduct[];
  doAddOrderProduct: (selectedProduct: IProduct) => void;
  load: boolean;
}

export const CompanyNavShellPage: React.FC<ICompanyNavShellPageProps> = ({
  productToDisplay,
  doAddOrderProduct,
  load,
}) => {
  const accessRoutes = useCompanyRouteHooks();

  return (
    <div className="company_nav_shell__container">
      <div className="compnay_ray_nav">
        <ShareNavComponent accessRoutes={accessRoutes} />
      </div>
      <div className="company_prdt__content">
        {/* <Routes>
          {accessRoutes.map((route) => ( 
            <Route
              key={route.path}
              path={route.path}
              element={
                <route.component
                  productToDisplay={productToDisplay}
                  addProductToOrder={doAddOrderProduct}
                />
              }
            />
          ))}
        </Routes> */}
        <CompanyProductComponent
          productToDisplay={productToDisplay}
          addProductToOrder={doAddOrderProduct}
          load={load}
        />
      </div>
    </div>
  );
};
