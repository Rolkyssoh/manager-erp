import React, { useState } from 'react';
import {
  Text,
  IconButton,
  IIconProps,
  TooltipHost,
  PrimaryButton,
} from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import { IProduct } from '@merp/entities';

import { ConfirmActionDialog } from './../../dialogs/confirm-action/ConfirmAction.dialog';
import { CreateCompanyDialog } from '../../dialogs';
import { NewCompanyDtoIn } from '@merp/dto';
import { CompanyService } from '../../services';

export interface IProductProps {
  product: IProduct;
  doDisable: (product: IProduct) => void;
  doDelete: (company: IProduct) => void;
  renderError?: () => void;
}

const handleEdit = () => {};

export const ProductComponent: React.FC<IProductProps> = ({
  product,
  doDisable,
  doDelete,
}) => {
  const disableIcon: IIconProps = { iconName: 'StatusCircleBlock' };
  const editIcon: IIconProps = { iconName: 'Edit' };
  const deleteIcon: IIconProps = { iconName: 'Delete' };
  const tooltipId = useId('tooltip');
  const [productInfos, setProductInfos] = useState<IProduct[]>([]);

  return (
    <li className="products__item-container">
      <div className="product__details">
        <Text variant="smallPlus">Poduct name:</Text>
        <Text variant="large">{product.product_name}</Text>
      </div>
      <div className="product__details">
        <Text variant="smallPlus">Product price: </Text>
        <Text variant="large">{product.product_unit_price}</Text>
      </div>
      <div className="product__details">
        <Text variant="smallPlus">Product Quantité: </Text>
        <Text variant="large">{product.stock_quantity}</Text>
      </div>
      <div className="product__details">
        <Text variant="smallPlus">Stock alert: </Text>
        <Text variant="large">{product.stock_alert_level}</Text>
      </div>

      <div className="company__actions">
        <TooltipHost content="Edit Product" id={tooltipId}>
          <CreateCompanyDialog
            onCreate={handleEdit}
            // companyInfos={company}
            renderTrigger={(trigger) => (
              <IconButton
                iconProps={editIcon}
                title="Edit Product"
                ariaLabel="Edit Product"
                onClick={trigger}
              />
            )}
          />
        </TooltipHost>
        <TooltipHost content="Disable Product" id={tooltipId}>
          <ConfirmActionDialog
            title="Disable Product"
            message={{
              values: 'Are you sure you want to disable this product?',
              id: 'lkssdsdo',
            }}
            negativeText="Cancel"
            positiveText="Disable Product"
            onPositive={() => doDisable(product)}
            renderTrigger={(trigger, renderDialog) => (
              <>
                <IconButton
                  iconProps={disableIcon}
                  title="Disable Product"
                  ariaLabel="Disable Product"
                  onClick={trigger}
                />
                {renderDialog()}
              </>
            )}
          />
        </TooltipHost>
        <TooltipHost content="Delete Product" id={tooltipId}>
          <ConfirmActionDialog
            title="Delete Product"
            message={{
              values: 'Are you sure you want to delete this product?',
              id: 'delssqeed',
            }}
            negativeText="Cancel"
            positiveText="Delete Product"
            onPositive={() => doDelete(product)}
            renderTrigger={(trigger, renderDialog) => (
              <>
                <IconButton
                  iconProps={deleteIcon}
                  title="Delete Product"
                  ariaLabel="Delete Product"
                  onClick={trigger}
                />
                {renderDialog()}
              </>
            )}
          />
        </TooltipHost>
      </div>
    </li>
  );
};
