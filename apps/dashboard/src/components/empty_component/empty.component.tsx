import React, { useState } from 'react';
import { DefaultButton, Text } from '@fluentui/react';

export interface IEmptyProps {
  default_props?: boolean;
  displayText: string;
}

export const EmptyComponent: React.FC<IEmptyProps> = ({ displayText }) => {
  return (
    <div className="empty_container">
      <Text variant="xLarge">{displayText}</Text>
    </div>
  );
};
