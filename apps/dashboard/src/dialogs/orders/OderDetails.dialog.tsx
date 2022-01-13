import React, { useState } from 'react';
import { Dialog, DialogType, DialogFooter, Text } from '@fluentui/react';
import { PrimaryButton, DefaultButton } from '@fluentui/react';
import { hiddenContentStyle, mergeStyles } from '@fluentui/react';
import { Toggle } from '@fluentui/react';
import { ContextualMenu, IIconProps, IconButton } from '@fluentui/react';
import { useId, useBoolean } from '@fluentui/react-hooks';

export interface IOrderDetailsProps {
  renderTrigger?: (setOpen: () => void) => void;
  open?: boolean;
}

const cancelIcon: IIconProps = { iconName: 'Cancel' };

const dialogStyles = { main: { maxWidth: 450 } };
const dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
  keepInBounds: true,
};

// const screenReaderOnly = mergeStyles(hiddenContentStyle);
// const dialogContentProps = {
//   type: DialogType.normal,
//   title: 'Missing Subject',
//   closeButtonAriaLabel: 'Close',
//   subText: 'Do you want to send this message without a subject?',
// };

export const OrderDetailsDialog: React.FC<IOrderDetailsProps> = ({
  renderTrigger,
  ...props
}) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
  const labelId: string = useId('dialogLabel');
  const subTextId: string = useId('subTextLabel');

  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: dialogStyles,
      dragOptions: isDraggable ? dragOptions : undefined,
      containerClassName: 'order-detail__container',
    }),
    [isDraggable, labelId, subTextId]
  );

  return (
    <>
      {renderTrigger && renderTrigger(toggleHideDialog)}
      <Dialog
        // isOpen={hideDialog}
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        // dialogContentProps={dialogContentProps}
        modalProps={modalProps}
        // containerClassName="order-detail__container"
      >
        <div className="orde-detail__header">
          <Text variant="xLarge">Order Details</Text>
          <IconButton
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={toggleHideDialog}
          />
        </div>
        <div className="order-detail__body">
          <ul>
            <li>
              <Text>Date : </Text>
            </li>
            <li>
              <Text>Total price : </Text>
            </li>
            <li>
              <Text>Product quantity : </Text>
            </li>
          </ul>
        </div>
        <div className="order-detail__footer">
          <DialogFooter>
            {/* <PrimaryButton onClick={toggleHideDialog} text="Send" /> */}
            <DefaultButton onClick={toggleHideDialog} text="Ok" />
          </DialogFooter>
        </div>
      </Dialog>
    </>
  );
};
