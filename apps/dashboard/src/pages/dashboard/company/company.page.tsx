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
import { LoginDialog } from 'apps/dashboard/src/dialogs';
import { useProfileRouteHooks } from 'apps/dashboard/src/hooks';
import { CompanyNavShellPage } from './companyNavShell.page';

export interface ICompanyPageProps extends RouteProps {
  default_props?: boolean;
}

export const CompanyPage: React.FC<ICompanyPageProps> = () => {
  const location = useLocation();
  const [company, setCompany] = useState<ICompany>(location.state.company);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [companyProducts, setCompanyProducts] = useState<IProduct[]>([]);
  const [companyProductsToDisplay, setCompanyProductsToDisplay] = useState<
    IProduct[]
  >([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [qteProductsOrdered, setQteProductsOrdered] = useState<number>();
  const [priceProductsOrderd, setPriceProductsOrdered] = useState<number>();
  const [search, setSearch] = useState<string>('');
  const [token, setToken] = useState<string>('');

  const companyRoute = useProfileRouteHooks();

  useEffect(() => {
    console.log('the received company:', company);
    if (location.state) {
      getProductsByCompany(company);
    }
    // const tokennn = localStorage.getItem('user') as string;
    const accessTok = localStorage.getItem('access_token')
      ? localStorage.getItem('access_token') || ''
      : '';
    setToken(accessTok);
    // const tokenParsed = JSON.parse(accessTok);
    console.log({ token });
  }, [location]);
  useEffect(() => {
    getProductQuantitiesAndPrices();
    const doSearch = search ? searchProduct(search) : companyProducts;
    setCompanyProductsToDisplay(doSearch);
  }, [orders, companyProducts, search]);

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

  const searchProduct = (keyword: string) => {
    return companyProducts.filter(
      (_) =>
        `${_.product_name} ${_.product_description}`.indexOf(keyword) !== -1
    );
  };

  const doAddOrderProduct = (selectedProduct: IProduct) => {
    const ids = orders.map((_) => _.product.id);
    const productInCart = ids.includes(selectedProduct.id);
    if (productInCart) {
      /** increase product number in cart */
      const newOrders = orders.map((_) => {
        if (_.product.id == selectedProduct.id) {
          if (selectedProduct.stock_quantity > _.quantity) {
            _.quantity++;
          } else {
            console.log('plus de produit en stock!!!!!!!');
          }
        }
        return _;
      });
      setOrders(newOrders);
    } else {
      /** Add product to cart */
      const order: Order = {
        product: selectedProduct,
        quantity: 1,
      };
      setOrders([order, ...orders]);
    }
  };

  const doRemoveOrderProduct = (sletedProduct: IProduct) => {
    const decreaseOrders = orders.map((_) => {
      if (_.product.id == sletedProduct.id) {
        if (_.quantity > 0) {
          _.quantity--;
        }
      }
      return _;
    });
    const filtereddd = filterItems(decreaseOrders);
    setOrders(filtereddd);
  };

  const filterItems = (prdt: Order[]) => {
    return prdt.filter((_) => _.quantity > 0);
  };

  const getProductQuantitiesAndPrices = () => {
    const allQty = orders.map((_) => _.quantity);
    const pricesByQties = orders.map(
      (_) => _.product.product_unit_price * _.quantity
    );
    const reducer = (previousValue: number, currenValue: number) =>
      previousValue + currenValue;
    if (allQty.length) {
      const totalQte = allQty.reduce(reducer);
      setQteProductsOrdered(totalQte);
    }
    if (pricesByQties.length) {
      const totalPrice = pricesByQties.reduce(reducer);
      setPriceProductsOrdered(totalPrice);
    }
  };

  const doCheckOrder = () => {
    console.log({ token });
    if (!token) {
      /** Open the login diaglog! */
      console.log('token not exist!!');
      <LoginDialog
        renderTrigger={(trigger) => (
          <DefaultButton
            text="Se connecter"
            className="home-action-button"
            onClick={trigger}
          />
        )}
      />;
    } else {
      /** check the order */
      console.log('cheking order', token);
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
            <div className="container_sections_search">
              <div className="sections_bar">Rayons</div>
              <SearchBox
                className="search-bar"
                placeholder="Search"
                onEscape={(ev) => setSearch('')}
                onClear={(ev) => setSearch('')}
                onChange={(_, newValue) => setSearch(newValue || '')}
              />
            </div>
            {/* <div className="nav-menu"> */}
            {/* Menu de navigation test of text align */}
            {/* <ProfileNavComponent accessRoutes={companyRoute} /> */}
            {companyProductsToDisplay.length ? (
              <CompanyNavShellPage
                productToDisplay={companyProductsToDisplay}
                doAddOrderProduct={doAddOrderProduct}
                load={loading}
              />
            ) : (
              <EmptyComponent displayText="There are no product now!" />
              // <LoadingComponent />
            )}
            {/* </div> */}
            {/* <div className="render-part"> */}
            {/* <div className="items">
                {loading ? (
                  <LoadingComponent />
                ) : (
                  <>
                    {companyProductsToDisplay.length ? (
                      companyProductsToDisplay.map((product) => (
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
              </div> */}
            {/* <CompanyNavShellPage /> */}
            {/* </div> */}
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
                      increaseNumberOfProducts={doAddOrderProduct}
                      decreaseNumberOfProducts={doRemoveOrderProduct}
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
                text={`Order ${qteProductsOrdered} for ${priceProductsOrderd} MAD`}
                className="box-button-style"
                onClick={doCheckOrder}
              />
            ) : (
              // <LoginDialog
              //   renderTrigger={(trigger) => (
              //     <DefaultButton
              //       text={`Order ${qteProductsOrdered} for ${priceProductsOrderd} MAD`}
              //       className="home-action-button"
              //       onClick={doCheckOrder}
              //     />
              //   )}
              // />
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
