import React, { useState } from 'react';
import {
  Text,
  IconButton,
  IIconProps,
  TooltipHost,
  PrimaryButton,
} from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import { ICompany } from '@merp/entities';

import { NewCompanyDtoIn } from '@merp/dto';
import { CreateCompanyDialog, ConfirmActionDialog } from '../../../dialogs';

export interface ICompanyProps {
  company: ICompany;
  doDisable: (company: ICompany) => void;
  doEnable: (company: ICompany) => void;
  onDelete: (company: ICompany) => void;
  renderError?: () => void;
}

const handleEdit = () => {};

export const CompanyComponent: React.FC<ICompanyProps> = ({
  company,
  doDisable,
  doEnable,
  onDelete,
}) => {
  const disableIcon: IIconProps = { iconName: 'StatusCircleBlock' };
  const enableIcon: IIconProps = { iconName: 'AcceptMediumIcon' };
  const editIcon: IIconProps = { iconName: 'Edit' };
  const deleteIcon: IIconProps = { iconName: 'Delete' };
  const tooltipId = useId('tooltip');

  return (
    <li className="companies__item">
      <Text variant="mediumPlus">{company.company_name}</Text>
      <Text>{company.company_address}</Text>
      <Text>{company.company_phone_number}</Text>

      <div className="company__actions">
        <TooltipHost content="Edit Company" id={tooltipId}>
          <CreateCompanyDialog
            onCreate={handleEdit}
            companyInfos={company}
            renderTrigger={(trigger) => (
              <IconButton
                iconProps={editIcon}
                title="Edit Company"
                ariaLabel="Edit Company"
                onClick={trigger}
              />
            )}
          />
        </TooltipHost>
        <TooltipHost
          content={company.disabled ? 'Enable Company' : 'Disable Company'}
          id={tooltipId}
        >
          <ConfirmActionDialog
            title={company.disabled ? 'Enable Company' : 'Disable Company'}
            message={{
              values: company.disabled
                ? 'Are you sure you want to enable this company?'
                : 'Are you sure you want to disable this company? All users of the company will be disabled as a result.',
              id: 'lksdlksdo',
            }}
            negativeText="Cancel"
            positiveText={
              company.disabled ? 'Enable Company' : 'Disable Company'
            }
            onPositive={() =>
              company.disabled ? doEnable(company) : doDisable(company)
            }
            renderTrigger={(trigger, renderDialog) => (
              <>
                {console.log('the disbaled val:', company.disabled)}
                {company.disabled ? (
                  <IconButton
                    iconProps={enableIcon}
                    title="Enable company"
                    ariaLabel="Enable company"
                    onClick={trigger}
                  />
                ) : (
                  <IconButton
                    iconProps={disableIcon}
                    title="Disable company"
                    ariaLabel="Disable company"
                    onClick={trigger}
                  />
                )}
                {renderDialog()}
              </>
            )}
          />
        </TooltipHost>
        <TooltipHost content="Delete Company" id={tooltipId}>
          <ConfirmActionDialog
            title="Delete Compnay"
            message={{
              values:
                'Are you sure you want to delete this compnay? All users of the company will be delete as a result.',
              id: 'deleteeed',
            }}
            negativeText="Cancel"
            positiveText="Delete Compnany"
            onPositive={() => onDelete(company)}
            renderTrigger={(trigger, renderDialog) => (
              <>
                <IconButton
                  iconProps={deleteIcon}
                  title="Delete Company"
                  ariaLabel="Delete Company"
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
