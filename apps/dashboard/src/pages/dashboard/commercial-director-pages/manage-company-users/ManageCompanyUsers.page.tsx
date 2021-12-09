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
import { AddUserDialog } from '../../../../dialogs';
import { CustomSearchBoxComponent } from '../../../../components';

export interface IManageCompanyUsersPageProps extends RouteProps {
  default_props?: boolean;
}

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

export const ManageCompanyUsersPage: React.FC<IManageCompanyUsersPageProps> =
  () => {
    return (
      <div className="container_manage_company_users">
        <Pivot aria-label="Count and Icon Pivot Example">
          <PivotItem
            headerText="Tous les employés"
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
                {/* <div> */}
                {/* <AddNewUserComponent formTitle="Sector delegate" /> */}
                {/* For Delegate */}
                <AddUserDialog
                  renderTrigger={(trigger) => (
                    <PrimaryButton
                      onClick={trigger}
                      text="Add New Sector Delegate"
                    />
                  )}
                  formTitle="Delegate"
                />
                {/* For Deliverer */}
                <AddUserDialog
                  renderTrigger={(trigger) => (
                    <PrimaryButton onClick={trigger} text="Add New Deliverer" />
                  )}
                  formTitle="Deliverer"
                />
                {/* </div>
                <div> */}
                {/* <AddNewUserComponent formTitle="Deliverer" /> */}
                {/* </div> */}
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
