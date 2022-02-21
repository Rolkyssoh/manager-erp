import React, { useEffect, useState } from 'react';
import { Text, IconButton, IIconProps, TooltipHost } from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import { IProduct } from '@merp/entities';

import { ConfirmActionDialog } from './../../dialogs/confirm-action/ConfirmAction.dialog';
import { AddProductDialog } from '../../dialogs';
import { NewProductDtoIn } from '@merp/dto';

export interface IProductProps {
  product: IProduct;
  doDisable: (product: IProduct) => void;
  doEnable: (product: IProduct) => void;
  doDelete: (company: IProduct) => void;
  renderError?: () => void;
  onEdit: (data: NewProductDtoIn) => void;
}

export const ProductComponent: React.FC<IProductProps> = ({
  product,
  onEdit,
  doDisable,
  doEnable,
  doDelete,
}) => {
  const disableIcon: IIconProps = { iconName: 'StatusCircleBlock' };
  const enableIcon: IIconProps = { iconName: 'StatusCircleBlock' };
  const editIcon: IIconProps = { iconName: 'Edit' };
  const deleteIcon: IIconProps = { iconName: 'Delete' };
  const tooltipId = useId('tooltip');
  const [productInfos, setProductInfos] = useState<IProduct[]>([]);

  useEffect(() => {}, [product, onEdit]);

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
          <AddProductDialog
            onCreate={onEdit}
            productDetails={product}
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
        <TooltipHost
          content={product.disabled ? 'Enable Product' : 'Disable Product'}
          id={tooltipId}
        >
          <ConfirmActionDialog
            title={product.disabled ? 'Enable Product' : 'Disable Product'}
            message={{
              values: product.disabled
                ? 'Are you sure you want to enable this product? '
                : 'Are you sure you want to disable this product?',
              id: 'lkssdsdo',
            }}
            negativeText="Cancel"
            positiveText={
              product.disabled ? 'Enable Product' : 'Disable Product'
            }
            onPositive={() =>
              product.disabled ? doEnable(product) : doDisable(product)
            }
            renderTrigger={(trigger, renderDialog) => (
              <>
                {product.disabled ? (
                  <IconButton
                    iconProps={enableIcon}
                    title="Enable Product"
                    ariaLabel="Enable Product"
                    onClick={trigger}
                  />
                ) : (
                  <IconButton
                    iconProps={disableIcon}
                    title="Disable Product"
                    ariaLabel="Disable Product"
                    onClick={trigger}
                  />
                )}
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
