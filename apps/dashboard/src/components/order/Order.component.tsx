import React, { useState } from 'react';
import {
  DefaultButton,
  IIconProps,
  TooltipHost,
  IconButton,
  Text,
} from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import { OrderDetailsDialog } from '../../dialogs';

export interface IOrderProps {
  default_props?: boolean;
}

export const OrderComponent: React.FC<IOrderProps> = () => {
  const disableIcon: IIconProps = { iconName: 'StatusCircleBlock' };
  const editIcon: IIconProps = { iconName: 'Edit' };
  const deleteIcon: IIconProps = { iconName: 'Delete' };
  const tooltipId = useId('tooltip');

  return (
    <li className="order__item">
      <Text>Date : </Text>
      <Text>Total price : </Text>
      <Text>Product quantity : </Text>
      <div className="order__actions">
        <TooltipHost content="Show details" id={tooltipId}>
          <OrderDetailsDialog
            renderTrigger={(trigger) => (
              <IconButton
                iconProps={disableIcon}
                title="Show details"
                ariaLabel="Show details"
                onClick={trigger}
              />
            )}
          />
        </TooltipHost>
      </div>
    </li>
  );
};
