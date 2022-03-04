import React, { useEffect, useState } from 'react';
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

export interface ILoginProps {
  renderTrigger?: (setOpen: () => void) => void;
  onRegister: () => void;
  open?: boolean;
}

interface ILogin {
  email: string;
  password: string;
}

const validationSchema = yup.object().shape({
  email: yup.string().required('auth:username_required'),
  password: yup.string().required('auth:password_required'),
});

const cancelIcon: IIconProps = { iconName: 'Cancel' };

export const LoginDialog: React.FC<ILoginProps> = ({
  renderTrigger,
  onRegister,
  open,
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

  useEffect(() => {
    if (open) toggleIsOpen();
  }, [open]);

  const onSubmit = async (
    value: ILogin,
    { setSubmitting }: FormikHelpers<ILogin>
  ) => {
    // setErrorMessage('')
    AuthService.login(value)
      .then(async (response) => {
        if ([200, 201].includes(response.status)) {
          const { user, token } = (await response.json()) as LoginDtoOut;
          if (user.disabled) {
            console.log('auth:user_disabled');
            // new_notification({
            //   title: 'Oooppsss!',
            //   message: 'auth:user_disabled',
            //   values: { name: user.user_name },
            //   variant: 'danger',
            //   shouldTranslate: true,
            //   durationMillis: 10000,
            // })
            return;
          }
          if (user.company && user.company.disabled) {
            console.log('auth:org_disabled');
            // new_notification({
            //   title: 'Oooppsss!',
            //   message: 'auth:org_disabled',
            //   values: { name: user.agency.name },
            //   variant: 'danger',
            //   shouldTranslate: true,
            //   durationMillis: 10000,
            // })
            return;
          }

          routeToAppropriatePagePerRole(user);
          updateCurrentUser(user);
          updateToken(token);
          // setRole(user.role.id)
          console.log({ user });
          console.log('auth:welcome_messag e');
          // new_notification({
          //   title: 'auth:login_welcome',
          //   message: 'auth:welcome_message',
          //   values: { name: user.user_name },
          //   variant: 'success',
          //   shouldTranslate: true,
          //   durationMillis: 3000,
          // })
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
  } = useFormik<ILogin>({
    initialValues: {
      email: '',
      password: '',
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
            <Text variant="xLarge">Se connecter</Text>
            <IconButton
              iconProps={cancelIcon}
              ariaLabel="Close popup modal"
              onClick={toggleIsOpen}
            />
          </div>
          <div className="modal__body">
            {/** Go to register */}

            <ActionButton
              text="Cliquez ici pour vous Inscrire"
              // className="home-action-button"
              onClick={() => {
                onRegister();
                toggleIsOpen();
              }}
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
              // onRenderIcon={
              //   () => <i className="las la-calendar-week color_maroon"></i>
              // }
              text={'Se connecter'}
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
