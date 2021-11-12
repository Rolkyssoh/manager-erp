import React, { ReactNode, useState, } from 'react'
import { Dialog, DialogType, DialogFooter } from '@fluentui/react';
import { PrimaryButton, DefaultButton } from '@fluentui/react';
import { hiddenContentStyle, mergeStyles } from '@fluentui/react';
import { ContextualMenu } from '@fluentui/react';
import { useId, useBoolean } from '@fluentui/react-hooks';
// import { useIntl } from 'react-intl';

export interface IConfirmActionProps {
  renderTrigger?: (
    setOpen: () => void,
    renderDialog: () => ReactNode
  ) => ReactNode,
  renderPositive?: (setOpen: () => void) => void,
  onPositive?: () => void,
  renderNegative?: (setOpen: () => void) => void,
  title: string, negativeText?: string,
  message?: { id: string, values?: any },
  positiveText?: string,
}

const dialogStyles = { main: { maxWidth: 450 } };
const dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
  keepInBounds: true,
};
const screenReaderOnly = mergeStyles(hiddenContentStyle);


export const ConfirmActionDialog: React.FC<IConfirmActionProps> = ({
  renderTrigger,
  renderPositive,
  renderNegative,
  title = "shared:ooopss",
  message = { id: "shared:confirm_action" },
  negativeText = "shared:cancel",
  positiveText = "shared:proceed",
  onPositive,
  ...props
}) => {
  // const { formatMessage } = useIntl();
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

  const dialogContentProps = {
    type: DialogType.close,
    title: title,// formatMessage({ id: title }),
    closeButtonAriaLabel: negativeText, // formatMessage({ id: negativeText }),
    subText: message.values
    // formatMessage(
    //   {id:message.id},
    //   {...message.values}
    // ),
  };

  const renderDialog = () => (
    <Dialog
      hidden={hideDialog}
      onDismiss={toggleHideDialog}
      dialogContentProps={dialogContentProps}
      modalProps={modalProps}
    >
      <DialogFooter>
        {renderNegative ? (
          <>{renderNegative(toggleHideDialog)}</>
        ) : (
          <DefaultButton
            onClick={toggleHideDialog}
            text={negativeText}
          />
        )}
        {renderPositive ? (
          <>{renderPositive(toggleHideDialog)}</>
        ) : (
          <PrimaryButton
            style={{
              backgroundColor: "var(--color-danger)",
              borderColor: "transparent"
            }}
            onClick={() => {
              toggleHideDialog()
              if (onPositive) {
                onPositive()
              }
            }}
            text={positiveText}
          />
        )}
      </DialogFooter>
    </Dialog>
  )

  return (
    <>
      {renderTrigger && renderTrigger(toggleHideDialog, renderDialog)}
    </>
  )
}
