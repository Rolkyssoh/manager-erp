import { ActionButton, DefaultButton } from '@fluentui/react';
import React from 'react';
import { RegisterDialog } from '../../dialogs';
import { useNavigate } from 'react-router';

export interface IHeaderProps {
  default_props?: boolean;
}

export const HeaderComponent: React.FC<IHeaderProps> = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="brand">
        <ActionButton text="Yango-Mboka" onClick={() => navigate('/')} />
      </div>
      <div className="first-search-bar">search bar</div>
      <div className="menu-item">
        <RegisterDialog
          renderTrigger={(trigger) => (
            <DefaultButton
              text="Commencer"
              onClick={trigger}
              className="header-start-button"
            />
          )}
        />
      </div>
    </div>
  );
};
