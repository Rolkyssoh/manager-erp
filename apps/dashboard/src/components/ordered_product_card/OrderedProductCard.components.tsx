import React, { useEffect, useState } from 'react';
import { DefaultButton, IIconProps, IconButton } from '@fluentui/react';

import './orderedProductCard.styles.scss';
import { IProduct } from '@merp/entities';

export interface IOrderedPrductCardProps {
  default_props?: boolean;
  orderProduct: Order;
  amount: number;
}

export type Order = {
  product: IProduct;
  quantity: number;
};

export const OrderedPrductCardComponent: React.FC<IOrderedPrductCardProps> = ({
  orderProduct,
  amount,
}) => {
  const [theOrder, setTheOrder] = useState<Order[]>([]);
  const addIcon: IIconProps = { iconName: 'Add' };
  const RemoveIcon: IIconProps = { iconName: 'Remove' };

  useEffect(() => {
    console.log({ orderProduct });
    setTheOrder([orderProduct]);
  }, []);

  return (
    <div className="ordered-product-card-container">
      {theOrder.length &&
        theOrder.map((_) => (
          <>
            <div className="ordered-left-part">
              <span className="ordered-quantity">{_.quantity}x</span>
              <div className="ordered-decrease-icon">
                <IconButton
                  iconProps={RemoveIcon}
                  // title="Add product"
                  ariaLabel="Add"
                />
              </div>
            </div>
            <div key={_.product.id} className="ordered-map">
              <div className="ordered-name-prod">
                <span className="ordered-product-wording">
                  {_.product.product_name}
                </span>
              </div>
              <div className="ordered-right-part">
                <div className="ordered-product-price">
                  {_.product.product_unit_price} MAD
                </div>
                <div className="ordered-increase-icon">
                  <IconButton
                    iconProps={addIcon}
                    // title="Add product"
                    ariaLabel="Add"
                  />
                </div>
              </div>
            </div>
          </>
        ))}
    </div>
  );
};
