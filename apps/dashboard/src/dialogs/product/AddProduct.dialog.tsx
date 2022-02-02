import React, { useEffect, useState } from 'react';
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
import { IProduct } from '@merp/entities';

export interface IAddProductProps {
  renderTrigger?: (setOpen: () => void) => void;
  open?: boolean;
  default_props?: boolean;
  onCreate: (data: NewProductDtoIn) => void;
  productDetails?: any;
}

interface IAddProduct {
  product_name: string;
  product_description: string;
  product_unit_price: number;
  stock_quantity: number;
  stock_alert_level: number;
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
  productDetails,
  ...props
}) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isOpen, { toggle: toggleIsOpen }] = useBoolean(false);

  useEffect(() => {
    console.log('the product details:', productDetails);
  }, []);

  const onSubmit = async (value: IAddProduct) => {
    const { onCreate } = props;
    console.log('the sumbited value:', value);
    if (!productDetails) {
      console.log('nous sommes dans le create ');
      CompanyService.new_product(value)
        .then(async (response) => {
          if (response.status !== 200) {
            console.log({ response });
          }
          const data = (await response.json()) as NewProductDtoIn;
          console.log({ data });
          onCreate(data);
          toggleIsOpen();
        })
        .catch((err) => {
          console.log({ err });
          setErrorMessage('Error while adding new product!');
        });
    }

    if (productDetails) {
      console.log('nous sommes dans le edit ');

      // const handleEditProduct = ({ id }: IProduct, val: IAddProduct) => {
      CompanyService.edit_product(productDetails.id, value)
        .then(async (response) => {
          if (response.status !== 200) {
            //@TODO #4
            alert('Error editing product');
            return;
          }
          const product = (await response.json()) as NewProductDtoIn;
          console.log('The modif:', product);
          props.onCreate(product);
          toggleIsOpen();
          return product;
        })
        .catch((err) => {
          //@TODO #4
          console.log({ err });
        });
      // };
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
  } = useFormik<NewProductDto>({
    initialValues: {
      product_name: productDetails ? productDetails.product_name : '',
      product_description: productDetails
        ? productDetails.product_description
        : '',
      product_unit_price: productDetails
        ? productDetails.product_unit_price
        : null,
      stock_quantity: productDetails ? productDetails.stock_quantity : null,
      stock_alert_level: productDetails
        ? productDetails.stock_alert_level
        : null,
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
                {!productDetails && (
                  <Text variant="xLargePlus">Nouveau produit</Text>
                )}
                {productDetails && (
                  <Text variant="xLargePlus">Modifier produit</Text>
                )}
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
                  text={productDetails ? 'Modifier' : 'Sauvegarder'}
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
