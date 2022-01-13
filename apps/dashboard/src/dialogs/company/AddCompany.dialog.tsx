import React, { useState } from 'react';
import {
  DefaultButton,
  TextField,
  IIconProps,
  Text,
  Spinner,
  SpinnerSize,
  Dialog,
  IconButton,
} from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { useFormik } from 'formik';
import * as yup from 'yup';
import UserService from '../../services/user.service';
import { NewCompanyDtoIn, NewUserDto } from '@merp/dto';
import { AddNewCompanyComponent } from '../../components';
import { join } from 'path';
import { ICompany } from '@merp/entities';

export interface ICreateNewCompanyComponent {
  renderTrigger?: (setOpen: () => void) => void;
  onCreate: (data: NewCompanyDtoIn) => void;
  companyInfos?: NewCompanyDtoIn;
}

export const CreateCompanyDialog: React.FC<ICreateNewCompanyComponent> = ({
  renderTrigger,
  ...props
}) => {
  const [isOpen, { toggle: toggleIsOpen }] = useBoolean(false);

  const handleOnCreate = (data: NewCompanyDtoIn) => {
    props.onCreate(data);
    toggleIsOpen();
  };

  return (
    <>
      {renderTrigger && renderTrigger(toggleIsOpen)}
      <Dialog
        isOpen={isOpen}
        onDismiss={toggleIsOpen}
        isBlocking={false}
        containerClassName="modal__container"
      >
        <AddNewCompanyComponent
          onCreate={handleOnCreate}
          toEdit={props.companyInfos}
        />
      </Dialog>
    </>
  );
};
