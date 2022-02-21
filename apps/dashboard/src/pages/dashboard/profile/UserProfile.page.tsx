import { Text, TextField, values } from '@fluentui/react';
import { ProfileNavComponent } from 'apps/dashboard/src/components';
import React, { useState } from 'react';
import { RouteProps } from 'react-router';

export interface IUserProfileProps extends RouteProps {
  default_props?: boolean;
}

export const UserProfilePage: React.FC<IUserProfileProps> = () => {
  return (
    <div className="user-profile__content">
      <div className="user-profile__header">
        <div className="user-profile__img">Image</div>
        <div className="user-profile__subtitle">
          <Text variant="xLarge">Username</Text>
          <span>UserStatus</span>
        </div>
      </div>
      <div className="user-profile__infos">
        <Text variant="xLargePlus">Basic Info</Text>
        <div className="user-profile__infos-input">
          <TextField type="text" label={'First Name'} name="first_name" />
          <TextField type="text" label={'Last Name'} name="last_name" />
        </div>
        <TextField type="text" label={'Email'} name="email" />
      </div>
      <div className="user-profile__pwd">
        <div>
          <Text variant="xLargePlus">Change password</Text>
          <TextField
            type="text"
            label={'Current password'}
            // value={values.first_name}
            // onChange={handleChange}
            name="current_pwd"
          />
          <TextField type="text" label={'New password'} name="new_pwd" />
          <TextField
            type="text"
            label={'Confirm new password'}
            name="new_pwd_confirm"
          />
        </div>
        <div>
          <Text variant="xLarge">Password requirements</Text>
          <p>Please follow this guide for a strong password:</p>
          <ul>
            <li>One special characters </li>
            <li>Min 6 characters</li>
            <li>One number (2 are recommended)</li>
            <li>Change it often</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
