import React, { useState } from 'react';
import { DefaultButton, Text } from '@fluentui/react';

export interface IEmptyProps {
  default_props?: boolean;
}

export const EmptyComponent: React.FC<IEmptyProps> = () => {
  return (
    <div className="empty_container">
      <Text variant="xLarge">
        There are no companies. Start by clicking on "Create Company" button
        above to create one
      </Text>
    </div>
  );
};
