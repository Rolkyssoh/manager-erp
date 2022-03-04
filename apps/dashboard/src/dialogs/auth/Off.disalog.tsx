import { DefaultButton } from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { RouteProps } from 'react-router';
import { LoginDialog, RegisterDialog } from '..';

export interface IOffDialogProps extends RouteProps {
  default_props?: boolean;
  renderDialog: (setDialog: () => void) => void;
  dialogType: string;
}

export const OffDialog: React.FC<IOffDialogProps> = ({
  renderDialog,
  dialogType,
}) => {
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [registerOpen, setRegisterOpen] = useState<boolean>(false);

  return (
    <div>
      {dialogType == 'register' ? (
        <>
          {' '}
          <RegisterDialog
            onLogin={() => setLoginOpen(true)}
            open={registerOpen}
            renderTrigger={(trigger) => renderDialog(trigger)}
          />
          <LoginDialog
            onRegister={() => setRegisterOpen(true)}
            open={loginOpen}
            renderTrigger={(trigger) => <></>}
          />{' '}
        </>
      ) : (
        <>
          <LoginDialog
            onRegister={() => setRegisterOpen(true)}
            open={loginOpen}
            renderTrigger={(trigger) => renderDialog(trigger)}
          />
          <RegisterDialog
            onLogin={() => setLoginOpen(true)}
            open={registerOpen}
            renderTrigger={(trigger) => {}}
          />
        </>
      )}
    </div>
  );
};
