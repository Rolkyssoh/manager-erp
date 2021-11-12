import React, { useState } from 'react';
import { DefaultButton } from '@fluentui/react';

import './orderedProductCard.styles.scss';

export interface IOrderedPrductCardProps {
  default_props?: boolean;
}

export const OrderedPrductCardComponent: React.FC<IOrderedPrductCardProps> =
  () => {
    return (
      <div className="ordered-product-card-container">
        <div className="ordered-left-part">
          <span className="ordered-quantity">40x</span>
          <div className="ordered-decrease-icon">-</div>
        </div>
        <div className="ordered-center-part">
          <span className="ordered-product-wording">
            Product title si c'est très long on
          </span>
        </div>
        <div className="ordered-right-part">
          <div className="ordered-product-price">184.00 MAD</div>
          <div className="ordered-increase-icon">+icon</div>
        </div>
      </div>
    );
  };
