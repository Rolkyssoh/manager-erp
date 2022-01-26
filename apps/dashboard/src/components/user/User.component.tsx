import React, { useState } from 'react';
import {
  DefaultButton,
  IconButton,
  IIconProps,
  Text,
  TooltipHost,
} from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import { IUser } from '@merp/entities';
import { ConfirmActionDialog } from '../../dialogs/confirm-action/ConfirmAction.dialog';

export interface IUserProps {
  user: IUser;
  onDelete: (user: IUser) => void;
  doDisable: (componay: IUser) => void;
}

export const UserComponent: React.FC<IUserProps> = ({
  user,
  onDelete,
  doDisable,
}) => {
  const disableIcon: IIconProps = { iconName: 'StatusCircleBlock' };
  const editIcon: IIconProps = { iconName: 'Edit' };
  const deleteIcon: IIconProps = { iconName: 'Delete' };
  const tooltipId = useId('tooltip');

  console.log('the user infos: ', user);

  return (
    <li className="users__item">
      <Text variant="mediumPlus">
        {user.first_name} {user.last_name}
      </Text>
      {user && <Text>User Role: {user?.role.name} </Text>}
      <Text>User company : {user.company?.company_name} </Text>
      <div className="user__actions">
        <TooltipHost>
          <IconButton
            iconProps={editIcon}
            title="Edit User"
            ariaLabel="Edit User"
          />
        </TooltipHost>

        <TooltipHost content="Disable User" id={tooltipId}>
          <ConfirmActionDialog
            title="Disable User"
            message={{
              values: 'Are you sure you want to disable this User?',
              id: 'lkksdo',
            }}
            negativeText="Cancel"
            positiveText="Disable User"
            onPositive={() => doDisable(user)}
            renderTrigger={(trigger, renderDialog) => (
              <>
                <IconButton
                  iconProps={disableIcon}
                  title="Disable User"
                  ariaLabel="Disable User"
                  onClick={trigger}
                />
                {renderDialog()}
              </>
            )}
          />
        </TooltipHost>

        <TooltipHost content="Delete User" id={tooltipId}>
          <ConfirmActionDialog
            title="Delete user"
            message={{
              values: 'Are you sure you want to delete this user?',
              id: 'deleteedus',
            }}
            negativeText="Cancel"
            positiveText="Delete User"
            onPositive={() => onDelete(user)}
            renderTrigger={(trigger, renderDialog) => (
              <>
                <IconButton
                  iconProps={deleteIcon}
                  title="Delete User"
                  ariaLabel="Delete User"
                  onClick={trigger}
                />
                {renderDialog()}
              </>
            )}
          />
        </TooltipHost>
      </div>
    </li>
  );
};
