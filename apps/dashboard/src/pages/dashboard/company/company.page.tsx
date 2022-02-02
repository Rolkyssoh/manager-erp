import {
  EmptyComponent,
  HeaderComponent,
  LoadingComponent,
  Order,
  OrderedPrductCardComponent,
  ProductCardComponent,
} from '../../../components';
import React, { useEffect, useState } from 'react';
import { RouteProps, useLocation } from 'react-router';

import { CompanyService } from 'apps/dashboard/src/services';
import { ICompany, IProduct } from '@merp/entities';
import { ProductDtoIn } from '@merp/dto';
import { DefaultButton, SearchBox, Text } from '@fluentui/react';

export interface ICompanyPageProps extends RouteProps {
  default_props?: boolean;
}

export const CompanyPage: React.FC<ICompanyPageProps> = () => {
  const location = useLocation();
  const [company, setCompany] = useState<ICompany>(location.state.company);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [companyProducts, setCompanyProducts] = useState<IProduct[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState<string>('');
  const [orderedAmountProduct, setOrderedAmountProduct] = useState(1);
  // const [order, setOrder] = useState<IOrder>(new IOrder());

  useEffect(() => {
    console.log('the received company:', company);
    if (location.state) {
      getProductsByCompany(company);
    }
  }, [location]);

  const getProductsByCompany = async ({ id }: ICompany) => {
    console.log('The company id:', id);
    await CompanyService.get_products_by_company(id)
      .then((response) => {
        if (response.status !== 200) {
          //@TODO #4
          // alert('error getting product by company');
          setError(true);
          setLoading(false);
          return [];
        }

        return response.json();
      })
      .then(({ products: resProducts }: ProductDtoIn) => {
        console.log('the response:', resProducts);
        setCompanyProducts(resProducts);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        //@TODO #4
        console.log({ err });
        setError(true);
      });
  };

  const doAddOrderProduct = (selectedProduct: IProduct) => {
    const ids = orders.map((_) => _.product.id);
    const productInCart = ids.includes(selectedProduct.id);
    if (productInCart) {
      const newOrders = orders.map((_) => {
        if (_.product.id == selectedProduct.id) {
          _.quantity++;
        }
        return _;
      });
      setOrders(newOrders);
    } else {
      const order: Order = {
        product: selectedProduct,
        quantity: 1,
      };
      setOrders([order, ...orders]);
      console.log({ selectedProduct });
    }
  };

  return (
    <div className="company-container">
      <HeaderComponent />
      <div className="comapny-body">
        <div className="products-side">
          <div className="company-header-container">
            <span className="company-name">{company.company_name}</span>
            <span className="company-subtitle">Subtitle</span>
          </div>
          <div className="products-items">
            <div className="nav-menu">
              Menu de navigation test of text align
            </div>
            <div className="render-part">
              <div>
                <SearchBox
                  className="search-bar"
                  placeholder="Search"
                  onEscape={(ev) => setSearch('')}
                  onClear={(ev) => setSearch('')}
                  onChange={(_, newValue) => setSearch(newValue || '')}
                />
              </div>
              <div className="items">
                {loading ? (
                  <LoadingComponent />
                ) : (
                  <>
                    {companyProducts.length ? (
                      companyProducts.map((product) => (
                        <ProductCardComponent
                          key={product.id}
                          product={product}
                          newOrderProduct={doAddOrderProduct}
                        />
                      ))
                    ) : (
                      <EmptyComponent displayText="There are no product now!" />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="command-box">
          <div className="box-detail">
            <span className="box-title">Votre commande ici</span>
            <span className="box-subtitle">autre text</span>
          </div>
          <div className="box-body">
            {loading ? (
              <LoadingComponent />
            ) : (
              <>
                {orders.length ? (
                  orders.map((_) => (
                    <OrderedPrductCardComponent
                      key={_.product.id}
                      orderProduct={_}
                      amount={orderedAmountProduct}
                    />
                  ))
                ) : (
                  <div className="empty-order-style">
                    <Text variant="smallPlus">Vos commandes ici</Text>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="box-footer">
            {orders.length ? (
              <DefaultButton
                text={`Order ${orders.length} for 443 MAD`}
                className="box-button-style"
              />
            ) : (
              <div>
                <Text>
                  You've not added any products yet. When you do, you'll see
                  them here!
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
