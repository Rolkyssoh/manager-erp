import React, { useState } from 'react';
import {
  Dialog,
  IconButton,
  DefaultButton,
  IIconProps,
  TextField,
  Spinner,
  SpinnerSize,
  Text,
} from '@fluentui/react';
import { ActionButton } from '@fluentui/react/lib/Button';
import {
  SECTOR_DELEGATE,
  COMMERCIAL_DIRECTOR,
  DELIVERER,
  SUPER_ADMIN,
  CUSTOMER,
} from '@merp/constants';
import { LoginDtoOut } from '@merp/dto';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { AuthService } from '../../../services';
import {
  useAuthStore,
  // adminUser
} from '../../../stores';
import { useNavigate } from 'react-router';
import { userInfo } from 'os';
import { LoginDialog } from '../..';
import { IUser } from '@merp/entities';

export interface IRegisterProps {
  renderTrigger?: (setOpen: () => void) => void;
  open?: boolean;
}

interface IRegister {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: number;
}

const validationSchema = yup.object().shape({
  email: yup.string().required('auth:username_required'),
  password: yup.string().required('auth:password_required'),
});

const cancelIcon: IIconProps = { iconName: 'Cancel' };

export const RegisterDialog: React.FC<IRegisterProps> = ({
  renderTrigger,
  ...props
}) => {
  const navigate = useNavigate();
  const { updateCurrentUser, updateToken } = useAuthStore();
  const [isOpen, { toggle: toggleIsOpen }] = useBoolean(false);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
  const labelId: string = useId('dialogLabel');
  const subTextId: string = useId('subTextLabel');
  const titleId = useId('Login');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit = async (
    value: IRegister,
    { setSubmitting }: FormikHelpers<IRegister>
  ) => {
    // setErrorMessage('')
    AuthService.register(value)
      .then(async (response) => {
        if ([200, 201].includes(response.status)) {
          const user = (await response.json()) as IUser;
          console.log('auth:welcome_messag e', user);
          // navigate('auth/login');
          // onDismiss(toggleIsOpen)
        } else if ([404, 401].includes(response.status)) {
          setErrorMessage('auth:no_username_password_match');
          const { message } = await response.json();
          console.log({ message });
        } else if ([500, 504].includes(response.status)) {
          const { message } = await response.json();
          console.log({ message });
          setErrorMessage(`code: 500. ${message}`);
        }
      })
      .catch((err) => {
        console.log({ err });
        setErrorMessage(`shared:uknown_error_prompt`);
      });
  };

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    handleSubmit,
    isSubmitting,
  } = useFormik<IRegister>({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role: 0,
    },
    validationSchema,
    onSubmit,
  });

  const routeToAppropriatePagePerRole = (user: LoginDtoOut['user']) => {
    switch (user.role?.id) {
      case SECTOR_DELEGATE:
        navigate(`/dashboard/${user.company?.id}/${user?.id}`);
        break;
      case COMMERCIAL_DIRECTOR:
        navigate(`/dashboard/${user.company?.id}/${user?.id}`);
        break;
      case DELIVERER:
        navigate(`/dashboard/${user.company?.id}/${user?.id}`);
        break;
      case SUPER_ADMIN:
        navigate(`/dashboard/`);
        break;
      case CUSTOMER:
        navigate(`/${user?.id}`);
        break;
    }
  };

  return (
    <>
      {renderTrigger && renderTrigger(toggleIsOpen)}
      <Dialog
        isOpen={isOpen}
        onDismiss={toggleIsOpen}
        isBlocking={false}
        containerClassName="modal__container"
      >
        <form onSubmit={handleSubmit}>
          <div className="modal__header">
            <Text variant="xLarge">S'inscrir</Text>
            <IconButton
              iconProps={cancelIcon}
              ariaLabel="Close popup modal"
              onClick={toggleIsOpen}
            />
          </div>
          <div className="modal__body">
            <p
              style={{
                fontSize: 16,
                textDecoration: 'underline',
              }}
            >
              {/** Cliquez ici pour vous Connecter */}
              <LoginDialog
                renderTrigger={(trigger) => (
                  <ActionButton
                    text="Cliquez ici pour vous Connecter"
                    // className="home-action-button"
                    onClick={trigger}
                  />
                )}
              />
            </p>
            <TextField
              type="text"
              label={'Prénom'}
              value={values.first_name}
              onChange={handleChange}
              name="first_name"
            />
            <TextField
              type="text"
              label={'Nom'}
              value={values.last_name}
              onChange={handleChange}
              name="last_name"
            />
            <TextField
              type="text"
              label={'Email'}
              value={values.email}
              onChange={handleChange}
              name="email"
            />
            <TextField
              type="password"
              label={'Mot de passe'}
              value={values.password}
              onChange={handleChange}
              name="password"
            />
          </div>
          <div className="modal__footer modal__footer--thin no-padding-top">
            <DefaultButton
              text={'Valider'}
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting && <Spinner size={SpinnerSize.xSmall} />}
            </DefaultButton>
          </div>
        </form>
      </Dialog>
    </>
  );
};
