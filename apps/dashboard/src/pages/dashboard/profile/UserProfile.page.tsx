import { DefaultButton, Text, TextField, values } from '@fluentui/react';
import { useAuthStore } from 'apps/dashboard/src/stores';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { RouteProps } from 'react-router';

export interface IUserProfileProps extends RouteProps {
  default_props?: boolean;
}

interface IBasicInfosUpdate {
  first_name: string;
  last_name: string;
  email: string;
}

export const UserProfilePage: React.FC<IUserProfileProps> = () => {
  const { user } = useAuthStore();
  console.log({ user });

  const onSubmit = (val: IBasicInfosUpdate) => {
    console.log({ val });
  };

  const { values, handleChange, handleSubmit } = useFormik<IBasicInfosUpdate>({
    initialValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    },
    onSubmit,
  });

  return (
    <div className="user-profile__content">
      <div className="user-profile__header">
        <div className="user-profile__img">Image</div>
        <div className="user-profile__subtitle">
          <Text variant="xLarge">Username</Text>
          <span>UserStatus</span>
        </div>
      </div>
      <form>
        <div className="user-profile__infos">
          <Text variant="xLargePlus">Basic Info</Text>
          <div className="user-profile__infos-input">
            <TextField
              type="text"
              label={'First Name'}
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
            />
            <TextField
              type="text"
              label={'Last Name'}
              name="last_name"
              value={values.last_name}
              onChange={handleChange}
            />
          </div>
          <TextField
            type="email"
            label={'Email'}
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <DefaultButton text="Update" style={{ marginTop: '10px' }} />
        </div>
      </form>
      <div className="user-profile__pwd">
        <form onSubmit={handleSubmit}>
          <Text variant="xLargePlus">Change password</Text>
          <TextField
            type="password"
            label={'Current password'}
            // value={values.first_name}
            // onChange={handleChange}
            canRevealPassword
            revealPasswordAriaLabel="Show password"
            name="current_pwd"
          />
          <TextField
            type="password"
            label={'New password'}
            name="new_pwd"
            canRevealPassword
            revealPasswordAriaLabel="Show password"
          />
          <TextField
            type="password"
            label={'Confirm new password'}
            name="new_pwd_confirm"
            canRevealPassword
            revealPasswordAriaLabel="Show password"
          />
          <DefaultButton text="Change" style={{ marginTop: '10px' }} />
        </form>
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
