import React, { useState } from 'react';
import { RouteProps } from 'react-router';
import {
  Icon,
  IStyleSet,
  Label,
  ILabelStyles,
  Pivot,
  IPivotItemProps,
  PivotItem,
  PrimaryButton,
} from '@fluentui/react';
import {
  AddNewCompanyComponent,
  CustomSearchBoxComponent,
} from 'apps/dashboard/src/components';

export interface IManageCompaniesProps extends RouteProps {
  default_props?: boolean;
}

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

export const ManageCompaniesPage: React.FC<IManageCompaniesProps> = () => {
  return (
    <div className="container_manage_companies">
      <Pivot
        aria-label="Count and Icon Pivot Example"
        // style={{ backgroundColor: 'red' }}
      >
        <PivotItem
          headerText="Toutes les entreprises"
          itemCount={42}
          itemIcon="Emoji2"
        >
          <Label styles={labelStyles}>Toutes les entreprises</Label>
        </PivotItem>
        <PivotItem headerText="Désactivées" itemIcon="Ringer" itemCount={1}>
          <Label styles={labelStyles}>Entreprise désactivées</Label>
        </PivotItem>
        <PivotItem headerText="Créer" itemIcon="Ringer" itemCount={1}>
          <Label styles={labelStyles}>
            <AddNewCompanyComponent />
          </Label>
        </PivotItem>
      </Pivot>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          flexDirection: 'row',
          // backgroundColor: 'blue',
        }}
      >
        <CustomSearchBoxComponent />
      </div>
    </div>
  );
};

function _customRenderer(
  link?: IPivotItemProps,
  defaultRenderer?: (link?: IPivotItemProps) => JSX.Element | null
): JSX.Element | null {
  if (!link || !defaultRenderer) {
    return null;
  }

  return (
    <span style={{ flex: '0 1 100%' }}>
      {defaultRenderer({ ...link, itemIcon: undefined })}
      <Icon iconName={link.itemIcon} style={{ color: 'red' }} />
    </span>
  );
}
