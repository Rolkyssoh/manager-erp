import { Text } from '@fluentui/react';
import { ICompany } from '@merp/entities';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './companyCard.styles.scss';

export interface ICompanyCardProps {
  company: ICompany;
  default_props?: boolean;
}

export const CompanyCardComponent: React.FC<ICompanyCardProps> = ({
  company,
}) => {
  return (
    <Link
      to={`/company/${company.id}`}
      state={{ company }}
      className="company-card"
    >
      <div className="company-image">image here</div>
      <div className="company-text">
        <span>{company.company_address}</span>
      </div>
      <div className="card-title">
        <Text variant="xxLarge" style={{ color: '#fff' }}>
          {company.company_name}
        </Text>
      </div>
    </Link>
  );
};
