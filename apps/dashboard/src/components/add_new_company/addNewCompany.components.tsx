import React, { useState } from 'react';
import {
  DefaultButton,
  Text,
  TextField,
  Spinner,
  SpinnerSize,
} from '@fluentui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CompanyService from '../../services/company.service';

export interface IAddNewCompanyProps {
  default_props?: boolean;
}

interface IAddNewCompany {
  email: string;
  password: string;
  company_name: string;
  company_phone_number: string;
  company_address: string;
  first_name: string;
  last_name: string;
}

const validationSchema = yup.object().shape({
  email: yup.string().required('auth:username_required'),
  password: yup.string().required('auth:password_required'),
  company_name: yup.string().required(),
  company_phone_number: yup.string().required(),
  company_address: yup.string().required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
});

export const AddNewCompanyComponent: React.FC<IAddNewCompanyProps> = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit = async (value: IAddNewCompany) => {
    console.log('the sumbited value:', value);
    console.log('the form data:', localStorage.access_token);
    console.log('the localStorage:', localStorage.getItem('access_token'));
    CompanyService.new_company(value)
      .then(async (response) => {
        console.log({ response });
      })
      .catch((err) => {
        console.log({ err });
        setErrorMessage('Error while adding new company!!');
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
  } = useFormik<IAddNewCompany>({
    initialValues: {
      email: '',
      password: '',
      company_name: '',
      company_phone_number: '',
      company_address: '',
      first_name: '',
      last_name: '',
    },
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="add_companies_container">
        <div className="company_infos">
          <div className="text_style">
            <Text variant="xLargePlus">Pour l'Entreprise</Text>
          </div>
          <TextField
            type="text"
            label={"Nom de l'Entreprise"}
            value={values.company_name}
            onChange={handleChange}
            name="company_name"
          />
          <TextField
            type="text"
            label={'Numéro de téléphone'}
            value={values.company_phone_number}
            onChange={handleChange}
            name="company_phone_number"
          />
          <TextField
            type="text"
            label={'Adresse'}
            value={values.company_address}
            onChange={handleChange}
            name="company_address"
          />
        </div>
        <div className="infos_dr">
          <div className="text_style">
            <Text variant="xLargePlus">Pour le Directeur commercial</Text>
          </div>
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
  );
};
