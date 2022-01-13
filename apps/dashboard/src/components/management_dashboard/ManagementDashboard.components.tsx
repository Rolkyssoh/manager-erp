import React, { useState } from 'react';
import { DefaultButton, SearchBox } from '@fluentui/react';
import { Text } from '@fluentui/react';

export interface IManagementDashboardProps {
  default_props?: boolean;
  renderAddItem?: () => void;
  customTitle: string;
}

export const ManagementDashboardComponent: React.FC<IManagementDashboardProps> =
  ({ customTitle }) => {
    const [search, setSearch] = useState<string>('');
    const [showingDisabled, setShowingDisabled] = useState<boolean>(false);

    const onDisable = (state: boolean) => {
      setShowingDisabled(state);
      console.log({ state });
      console.log('the showingDisable:', showingDisabled);
    };

    return (
      <div className="component__container">
        <header className="component_header">
          <Text variant="xLarge">{customTitle}</Text>
          <SearchBox
            placeholder="Search"
            onEscape={(ev) => setSearch('')}
            onClear={(ev) => setSearch('')}
            onChange={(_, newValue) => setSearch(newValue || '')}
          />
        </header>
        <nav className="component__nav">
          <DefaultButton
            text="All_items"
            onClick={() => onDisable(false)}
            checked={!showingDisabled}
          />
          <DefaultButton
            text="Disabled_items"
            onClick={() => onDisable(true)}
            checked={showingDisabled}
          />
        </nav>
        <ul className="items__list"></ul>
      </div>
    );
  };
