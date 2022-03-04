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

  const checkRegisterState = () => {
    if (registerOpen) {
      setRegisterOpen(false);
    }
  };

  const checkLoginState = () => {
    if (loginOpen) {
      setLoginOpen(false);
    }
  };

  return (
    <div>
      {dialogType == 'register' ? (
        <>
          {' '}
          <RegisterDialog
            onLogin={() => {
              setLoginOpen(true);
              checkRegisterState();
            }}
            open={registerOpen}
            renderTrigger={(trigger) => renderDialog(trigger)}
          />
          <LoginDialog
            onRegister={() => {
              setRegisterOpen(true);
              checkLoginState();
            }}
            open={loginOpen}
            renderTrigger={(trigger) => <></>}
          />{' '}
        </>
      ) : (
        <>
          <LoginDialog
            onRegister={() => {
              setRegisterOpen(true);
              checkLoginState();
            }}
            open={loginOpen}
            renderTrigger={(trigger) => renderDialog(trigger)}
          />
          <RegisterDialog
            onLogin={() => {
              setLoginOpen(true);
              checkRegisterState();
            }}
            open={registerOpen}
            renderTrigger={(trigger) => {}}
          />
        </>
      )}
    </div>
  );
};
