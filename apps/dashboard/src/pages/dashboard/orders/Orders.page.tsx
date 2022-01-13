import React, { useState } from 'react';
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
import { Text } from '@fluentui/react';
import { OrderComponent } from 'apps/dashboard/src/components';

export interface IOrdersPageProps extends RouteProps {
  default_props?: boolean;
}

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

export const OrdersPage: React.FC<IOrdersPageProps> = () => {
  const [search, setSearch] = useState<string>('');
  const [showingDisabled, setShowingDisabled] = useState<boolean>(false);

  const onDisable = (state: boolean) => {
    setShowingDisabled(state);
    // console.log({ state });
    console.log('the showingDisable:', showingDisabled);
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
      {/* <nav className="orders__nav">
        <DefaultButton
          text="All orders"
          onClick={() => onDisable(showingDisabled)}
          checked={!showingDisabled}
        />
      </nav> */}
      <div>
        <Pivot aria-label="Count and Icon Pivot Example">
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
              </ul>
            </Label>
          </PivotItem>
        </Pivot>
      </div>
      {/* <ul className="orders__list">
        <OrderComponent />
        <OrderComponent />
      </ul> */}
    </div>
  );
};
