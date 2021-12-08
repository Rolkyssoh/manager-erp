import React, { useState } from 'react';
import {
  DefaultButton,
  TextField,
  IIconProps,
  Text,
  Spinner,
  SpinnerSize,
  Dialog,
  IconButton,
} from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { useFormik } from 'formik';
import * as yup from 'yup';
import UserService from '../../services/user.service';
import { NewUserDto } from '@merp/dto';

export interface IAddUserProps {
  renderTrigger?: (setOpen: () => void) => void;
  open?: boolean;
  default_props?: boolean;
  formTitle: string;
}

interface IAddUser {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

const validationSchema = yup.object().shape({
  email: yup.string().required('auth:username_required'),
  password: yup.string().required('auth:password_required'),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
});

const cancelIcon: IIconProps = { iconName: 'Cancel' };

export const AddUserDialog: React.FC<IAddUserProps> = ({
  renderTrigger,
  ...props
}) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isOpen, { toggle: toggleIsOpen }] = useBoolean(false);
  console.log('the props: ', props.formTitle);

  //   const rightRequest: IAddUserProps = (val: NewUserDto) => {
  //   const { formTitle } = props;
  //     if(formTitle == "Delegate"){
  //         return UserService.new_sector_delegate(val)
  //     }
  //     if(formTitle == "Deliverer"){
  //         return UserService.new_deliverer(val)
  //     }
  //   }

  const onSubmit = async (value: NewUserDto) => {
    const { formTitle } = props;
    console.log('the sumbited value:', value);
    console.log('the form data:', localStorage.access_token);
    console.log('the localStorage:', localStorage.getItem('access_token'));
    if (formTitle == 'Delegate') {
      UserService.new_sector_delegate(value)
        .then(async (response) => {
          console.log({ response });
        })
        .catch((err) => {
          console.log({ err });
          setErrorMessage('Error while adding new company!!');
        });
    }
    if (formTitle == 'Deliverer') {
      UserService.new_deliverer(value)
        .then(async (response) => {
          console.log({ response });
        })
        .catch((err) => {
          console.log({ err });
          setErrorMessage('Error while adding new company!!');
        });
    }
  };

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    handleSubmit,
    isSubmitting,
  } = useFormik<NewUserDto>({
    initialValues: {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      role: 0,
      company: '',
    },
    validationSchema,
    onSubmit,
  });

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
            {/* {props.formTitle == 'Delegate' && (
              <Text variant="xLarge">Nouveau Délégé de Secteur</Text>
            )}
            {props.formTitle == 'Deliverer' && (
              <Text variant="xLarge">Nouveau Livreur</Text>
            )} */}
            <IconButton
              iconProps={cancelIcon}
              ariaLabel="Close popup modal"
              onClick={toggleIsOpen}
            />
          </div>
          <div className="modal__body">
            <div className="add-user-container">
              <div className="text_style">
                {props.formTitle == 'Delegate' && (
                  <Text variant="xLargePlus">Nouveau Délégé de Secteur</Text>
                )}
                {props.formTitle == 'Deliverer' && (
                  <Text variant="xLargePlus">Nouveau Livreur</Text>
                )}
              </div>
              <TextField
                type="text"
                label={'Prénom'}
                // value={values.first_name}
                onChange={handleChange}
                name="first_name"
              />
              <TextField
                type="text"
                label={'Nom'}
                // value={values.last_name}
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
              <div className="modal__footer modal__footer--thin no-padding-top">
                <DefaultButton
                  // onRenderIcon={
                  //   () => <i className="las la-calendar-week color_maroon"></i>
                  // }
                  text={'Sauvegarder'}
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting && <Spinner size={SpinnerSize.xSmall} />}
                </DefaultButton>
              </div>
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
};
