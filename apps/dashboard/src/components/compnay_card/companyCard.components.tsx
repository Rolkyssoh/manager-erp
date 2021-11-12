import React, { useState } from 'react';

import './companyCard.styles.scss';

export interface ICompanyCardProps {
  default_props?: boolean;
}

export const CompanyCardComponent: React.FC<ICompanyCardProps> = () => {
  return (
    <div className="company-card">
      <div className="company-image">image here</div>
      <div className="company-text">
        <span>Some text</span>
      </div>
    </div>
  );
};
