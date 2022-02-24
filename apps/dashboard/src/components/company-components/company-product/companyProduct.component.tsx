import { IProduct } from '@merp/entities';
import React, { useEffect, useState } from 'react';
import { RouteProps } from 'react-router';
import { EmptyComponent, LoadingComponent, ProductCardComponent } from '../..';

export interface ICompanyProductComponentProps extends RouteProps {
  default_props?: boolean;
  productToDisplay: IProduct[];
  addProductToOrder: (selectedProduct: IProduct) => void;
  load: boolean;
}

export const CompanyProductComponent: React.FC<ICompanyProductComponentProps> =
  ({ productToDisplay, addProductToOrder: doAddOrderProduct, load }) => {
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
      console.log('on est dans le companyProduct:', productToDisplay);
    }, []);

    return (
      <div className="items">
        {load ? (
          <LoadingComponent />
        ) : (
          <>
            {productToDisplay.length ? (
              productToDisplay.map((product) => (
                <ProductCardComponent
                  key={product.id}
                  product={product}
                  newOrderProduct={doAddOrderProduct}
                />
              ))
            ) : (
              <EmptyComponent displayText="There are no product now!" />
            )}
          </>
        )}
      </div>
    );
  };
