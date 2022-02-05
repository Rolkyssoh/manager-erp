import React, { useEffect, useState } from 'react';
import { IIconProps, IconButton } from '@fluentui/react';

import { IProduct } from '@merp/entities';

export interface IProductCardProps {
  default_props?: boolean;
  product: IProduct;
  newOrderProduct: (product: IProduct) => void;
}

export const ProductCardComponent: React.FC<IProductCardProps> = ({
  product,
  newOrderProduct,
}) => {
  const addIcon: IIconProps = { iconName: 'Add' };
  useEffect(() => {
    console.log('the product:', product);
  }, []);

  const AddOrderProduct = () => {
    newOrderProduct(product);
  };

  return (
    <div className="product-card">
      <div className="left-part">
        <div className="photo">image</div>
        <div className="price"> {product.product_unit_price} Dh</div>
      </div>
      <div className="product-detail">
        <div>
          <span>{product.product_name}</span> <br />
          <span>{product.product_description}</span>
        </div>
      </div>
      <div className="right-part">
        <div className="price">Prix</div>
        <div className="add-commande">
          <IconButton
            iconProps={addIcon}
            // title="Add product"
            ariaLabel="Add"
            onClick={AddOrderProduct}
          />
        </div>
      </div>
    </div>
  );
};
