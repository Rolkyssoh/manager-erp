import { ActionButton, DefaultButton } from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { LoginDialog, OffDialog, RegisterDialog } from '../../dialogs';
import { useNavigate } from 'react-router';
import { CustomDropdownComponent } from '..';
import { useAuthStore } from '../../stores';

export interface IHeaderProps {
  default_props?: boolean;
}

export const HeaderComponent: React.FC<IHeaderProps> = () => {
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [registerOpen, setRegisterOpen] = useState<boolean>(false);
  const { user, token } = useAuthStore();

  useEffect(() => {
    console.log('the scroll event:', document.documentElement.scrollTop);
  }, []);

  // For scroll event
  window.onscroll = () => {
    if (document.documentElement.scrollTop > 58) {
      (
        document.getElementById('header_nav') as HTMLInputElement
      ).style.background = 'red';
    } else {
      (
        document.getElementById('header_nav') as HTMLInputElement
      ).style.background = 'inherit';
    }
  };

  return (
    <div className="header" id="header_nav">
      <div className="brand">
        <ActionButton text="Yango-Mboka" onClick={() => navigate('/')} />
      </div>
      <div className="first-search-bar">search bar</div>
      <div className="menu-item">
        {token ? (
          <CustomDropdownComponent />
        ) : (
          <OffDialog
            dialogType="register"
            renderDialog={(trigger) => (
              <DefaultButton
                text="Commencer"
                onClick={trigger}
                className="header-start-button"
              />
            )}
          />
        )}
      </div>
    </div>
  );
};
