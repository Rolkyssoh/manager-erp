import { PrimaryButton } from '@fluentui/react';
import { LoginDialog } from '../../../dialogs';
import React, { useState } from 'react';
import { RouteProps } from 'react-router';
import { CompanyCardComponent, HeaderComponent } from '../../../components';

export interface ILoginPageProps extends RouteProps {
  default_props?: boolean;
}

export const LoginPage: React.FC<ILoginPageProps> = () => {
  return (
    <div>
      <LoginDialog
        renderTrigger={(trigger) => (
          <PrimaryButton onClick={trigger} text="Send" className="singing" />
        )}
      />
    </div>
  );
};
