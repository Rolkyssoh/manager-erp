import React, { useState } from 'react';
import { DefaultButton } from '@fluentui/react';

import './productCard.styles.scss';

export interface IProductCardProps {
  default_props?: boolean;
}

export const ProductCardComponent: React.FC<IProductCardProps> = () => {
  return (
    <div className="product-card">
      <div className="left-part">
        <div className="photo">image</div>
        <div className="price">Prix ou Icone</div>
      </div>
      <div className="product-detail">
        <div>
          <span>Title</span> <br />
          <span>Descripton</span>
        </div>
      </div>
      <div className="right-part">
        <div className="price">Prix</div>
        <div className="add-commande">Icone</div>
      </div>
    </div>
  );
};
