import React, { useState } from 'react';
import { DefaultButton, Spinner, SpinnerSize } from '@fluentui/react';

export interface ILoadingProps {
  default_props?: boolean;
}

export const LoadingComponent: React.FC<ILoadingProps> = () => {
  return (
    <div className="cusstom-loading-container">
      <Spinner size={SpinnerSize.large} />;
    </div>
  );
};
