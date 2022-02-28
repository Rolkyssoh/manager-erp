import { ActionButton, DefaultButton } from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { RegisterDialog } from '../../dialogs';
import { useNavigate } from 'react-router';
import { CustomDropdownComponent } from '..';

export interface IHeaderProps {
  default_props?: boolean;
}

export const HeaderComponent: React.FC<IHeaderProps> = () => {
  const navigate = useNavigate();
  const [currentToken, setCurrentToken] = useState<string>('');

  useEffect(() => {
    const accessTok = localStorage.getItem('access_token')
      ? localStorage.getItem('access_token') || ''
      : '';
    console.log('the token:', localStorage.getItem('access_token'));
    setCurrentToken(accessTok);
  }, [localStorage]);

  return (
    <div className="header">
      <div className="brand">
        <ActionButton text="Yango-Mboka" onClick={() => navigate('/')} />
      </div>
      <div className="first-search-bar">search bar</div>
      <div className="menu-item">
        {currentToken ? (
          <CustomDropdownComponent />
        ) : (
          <RegisterDialog
            renderTrigger={(trigger) => (
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
