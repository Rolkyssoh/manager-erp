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
import { NewProductDto, NewProductDtoIn } from '@merp/dto';
import { CompanyService } from '../../services';

export interface IAddProductProps {
  renderTrigger?: (setOpen: () => void) => void;
  open?: boolean;
  default_props?: boolean;
  onCreate: (data: NewProductDtoIn) => void;
}

interface IAddProduct {
  product_name: string;
  product_description: string;
  product_unit_price: string;
  stock_quantity: string;
  stock_alert_level: string;
}

const validationSchema = yup.object().shape({
  product_name: yup.string().required(),
  product_description: yup.string().required(),
  product_unit_price: yup.number().required(),
  stock_quantity: yup.number().required(),
  stock_alert_level: yup.number().required(),
});

const cancelIcon: IIconProps = { iconName: 'Cancel' };

export const AddProductDialog: React.FC<IAddProductProps> = ({
  renderTrigger,
  ...props
}) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isOpen, { toggle: toggleIsOpen }] = useBoolean(false);

  const onSubmit = async (value: IAddProduct) => {
    const { onCreate } = props;
    console.log('the sumbited value:', value);
    // console.log('the form data:', localStorage.access_token);
    // UserService.new_sector_delegate(value);
    CompanyService.new_product(value)
      .then(async (response) => {
        if (response.status !== 200) {
          console.log({ response });
        }
        const data = (await response.json()) as NewProductDtoIn;
        onCreate(data);
        toggleIsOpen();
      })
      .catch((err) => {
        console.log({ err });
        setErrorMessage('Error while adding new product!');
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
  } = useFormik<NewProductDto>({
    initialValues: {
      product_name: '',
      product_description: '',
      product_unit_price: '',
      stock_quantity: '',
      stock_alert_level: '',
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
            <IconButton
              iconProps={cancelIcon}
              ariaLabel="Close popup modal"
              onClick={toggleIsOpen}
            />
          </div>
          <div className="modal__body">
            <div className="add-user-container">
              <div className="text_style">
                <Text variant="xLargePlus">Nouveau produit</Text>
              </div>
              <TextField
                type="text"
                label={'Product name'}
                value={values.product_name}
                onChange={handleChange}
                name="product_name"
              />
              <TextField
                type="text"
                label={'Product description'}
                value={values.product_description}
                onChange={handleChange}
                name="product_description"
              />
              <TextField
                type="number"
                label={'Product price'}
                value={values.product_unit_price}
                onChange={handleChange}
                name="product_unit_price"
              />
              <TextField
                type="number"
                label={'Product quantity'}
                value={values.stock_quantity}
                onChange={handleChange}
                name="stock_quantity"
              />
              <TextField
                type="number"
                label={'Stock alert'}
                value={values.stock_alert_level}
                onChange={handleChange}
                name="stock_alert_level"
              />
              <div className="modal__footer modal__footer--thin no-padding-top">
                <DefaultButton
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
