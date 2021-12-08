import React, { useState } from 'react';
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
import { RouteProps } from 'react-router';
import { AddUserDialog } from 'apps/dashboard/src/dialogs';
import { CustomSearchBoxComponent } from 'apps/dashboard/src/components';

export interface IManageCompanyDelivererProps extends RouteProps {
  default_props?: boolean;
}

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

export const ManageCompanyDelivererPage: React.FC<IManageCompanyDelivererProps> =
  () => {
    return (
      <div className="container_manage_company_deliverer">
        <Pivot aria-label="Count and Icon Pivot Example">
          <PivotItem
            headerText="Tous les Livreurs"
            itemCount={42}
            itemIcon="Globe"
          >
            <Label styles={labelStyles}>Pivot #3</Label>
          </PivotItem>
          <PivotItem headerText="Désactivés" itemIcon="Ringer" itemCount={1}>
            <Label styles={labelStyles}>Pivot #4</Label>
          </PivotItem>
          <PivotItem headerText="Ajouter Nouveau" itemIcon="Emoji2">
            <Label styles={labelStyles}>
              <div className="add-new-user-item">
                {/* For Deliverer */}
                <AddUserDialog
                  renderTrigger={(trigger) => (
                    <PrimaryButton onClick={trigger} text="Add New Deliverer" />
                  )}
                  formTitle="Deliverer"
                />
              </div>
            </Label>
          </PivotItem>
        </Pivot>
        <div className="custom_search_bar">
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
