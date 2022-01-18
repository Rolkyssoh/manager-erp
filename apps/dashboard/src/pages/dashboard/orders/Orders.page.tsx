import React, { useState, useEffect } from 'react';
import { RouteProps } from 'react-router';
import {
  DefaultButton,
  ILabelStyles,
  IStyleSet,
  Label,
  Pivot,
  PivotItem,
  SearchBox,
} from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { Text } from '@fluentui/react';
import {
  OrderComponent,
  ProductComponent,
} from 'apps/dashboard/src/components';
import { AddProductDialog } from 'apps/dashboard/src/dialogs';
import { NewProductDtoIn, ProductDtoIn } from '@merp/dto';
import { IProduct } from '@merp/entities';
import { CompanyService } from 'apps/dashboard/src/services';

export interface IOrdersPageProps extends RouteProps {
  default_props?: boolean;
}

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

export const OrdersPage: React.FC<IOrdersPageProps> = () => {
  const [search, setSearch] = useState<string>('');
  const [showingDisabled, setShowingDisabled] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const getProducts = async () => {
    CompanyService.get_products()
      .then((response) => {
        if (response.status !== 200) {
          //@TODO #4
          // alert('error getting companies');
          setError(true);
          setLoading(false);
          return [];
        }

        return response.json();
      })
      .then(({ products: resProducts }: ProductDtoIn) => {
        console.log('the products:', resProducts);
        setProducts(resProducts);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        //@TODO #4
        console.log({ err });
        setError(true);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    if (products) {
      setFilteredProducts(products.filter((_) => !_.disabled));
    }
  }, [products]);

  const handleOnCreate = (data: NewProductDtoIn) => {
    setSearch('');
    // setShowingDisabled(false);
    // setProducts([data.product, ...products]);
  };

  const handleDisableProduct = ({ id }: IProduct) => {
    CompanyService.disable_product(id)
      .then(async (response) => {
        if (response.status !== 200) {
          //@TODO #4
          alert('Error disabling product');
          return;
        }
        const product = (await response.json()) as IProduct;
        //@TODO #4 : Success disabled product
        setProducts(products.filter((_) => _.id !== product.id));
        return product;
      })
      .catch((err) => {
        //@TODO #4
        console.log({ err });
      });
  };

  const handleDeleteProduct = ({ id }: IProduct) => {
    CompanyService.delete_product(id)
      .then(async (response) => {
        if (response.status !== 200) {
          //@TODO #4
          alert('Error deleting product');
          return;
        }
        const product = (await response.json()) as IProduct;
        //@TODO #4 : Success deleting company
        setProducts(products.filter((_) => _.id !== product.id));
        return response.json();
      })
      .catch((err) => {
        //@TODO #4
        console.log({ err });
      });
  };

  return (
    <div className="orders__container">
      <header className="orders_header">
        <Text variant="xLarge">Oders</Text>
        <SearchBox
          placeholder="Search"
          onEscape={(ev) => setSearch('')}
          onClear={(ev) => setSearch('')}
          onChange={(_, newValue) => setSearch(newValue || '')}
        />
      </header>
      <div className="orders_content">
        <div className="orders-action-product">
          <AddProductDialog
            onCreate={handleOnCreate}
            renderTrigger={(trigger) => (
              <DefaultButton
                text="New Product"
                // className="home-action-button"
                onClick={trigger}
              />
            )}
          />
        </div>
        <Pivot aria-label="Count and Icon Pivot Example" className="orders_nav">
          <PivotItem
            headerText="All products"
            itemCount={products.length}
            itemIcon="Globe"
          >
            <Label styles={labelStyles}>
              <ul className="orders__list">
                {filteredProducts.length
                  ? filteredProducts.map((product) => (
                      <ProductComponent
                        doDisable={handleDisableProduct}
                        doDelete={handleDeleteProduct}
                        product={product}
                        key={product.id}
                      />
                    ))
                  : null}
              </ul>
            </Label>
          </PivotItem>
          <PivotItem headerText="All orders" itemCount={42} itemIcon="Globe">
            <Label styles={labelStyles}>
              <ul className="orders__list">
                <OrderComponent />
              </ul>
            </Label>
          </PivotItem>
          <PivotItem
            headerText="All purchase order"
            itemIcon="Ringer"
            itemCount={1}
          >
            <Label styles={labelStyles}>
              <ul className="orders__list">
                <OrderComponent />
                <OrderComponent />
              </ul>
            </Label>
          </PivotItem>
          <PivotItem headerText="All bill" itemIcon="Emoji2">
            <Label styles={labelStyles}>
              <ul className="orders__list">
                <OrderComponent />
                <OrderComponent />
                <OrderComponent />
              </ul>
            </Label>
          </PivotItem>
          <PivotItem headerText="Deliverer notes" itemIcon="Emoji2">
            <Label styles={labelStyles}>
              <ul className="orders__list">
                <OrderComponent />
                <OrderComponent />
                <OrderComponent />
                <OrderComponent />
                <OrderComponent />
                <OrderComponent />
                <OrderComponent />
                <OrderComponent />
              </ul>
            </Label>
          </PivotItem>
        </Pivot>
      </div>
    </div>
  );
};
