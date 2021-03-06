import React, { useState, } from 'react'
import { Dialog, DialogType, DialogFooter } from '@fluentui/react';
import { PrimaryButton, DefaultButton } from '@fluentui/react';
import { hiddenContentStyle, mergeStyles } from '@fluentui/react';
import { Toggle } from '@fluentui/react';
import { ContextualMenu } from '@fluentui/react';
import { useId, useBoolean } from '@fluentui/react-hooks';

export interface IBaseProps {
  renderTrigger?: (setOpen: () => void) => void,
  open?: boolean,
}

const dialogStyles = { main: { maxWidth: 450 } };
const dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
  keepInBounds: true,
};

const screenReaderOnly = mergeStyles(hiddenContentStyle);
const dialogContentProps = {
  type: DialogType.normal,
  title: 'Missing Subject',
  closeButtonAriaLabel: 'Close',
  subText: 'Do you want to send this message without a subject?',
};


export const BaseDialog: React.FC<IBaseProps> = ({
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
    }),
    [isDraggable, labelId, subTextId],
  );

  return (
    <>
      {renderTrigger && renderTrigger(toggleHideDialog)}
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <DialogFooter>
          <PrimaryButton onClick={toggleHideDialog} text="Send" />
          <DefaultButton onClick={toggleHideDialog} text="Don't send" />
        </DialogFooter>
      </Dialog>
    </>
  )
}
