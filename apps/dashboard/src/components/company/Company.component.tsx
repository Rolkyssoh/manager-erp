import React, { useState, } from 'react'
import { Text, IconButton, IIconProps, TooltipHost } from '@fluentui/react'
import { useId } from '@fluentui/react-hooks'
import { ICompany } from '@merp/entities';

import { ConfirmActionDialog } from './../../dialogs/confirm-action/ConfirmAction.dialog'

export interface ICompanyProps {
  company: ICompany,
  onDelete: (company:ICompany) => void
}

export const CompanyComponent: React.FC<ICompanyProps> = ({ company, onDelete }) => {
  const disableIcon: IIconProps = { iconName: 'StatusCircleBlock' };
  const editIcon: IIconProps = { iconName: 'Edit' };
  const deleteIcon: IIconProps = { iconName: 'Delete' };
  const tooltipId = useId('tooltip');

  return (
    <li className="companies__item">
      <Text variant="mediumPlus">{company.company_name}</Text>
      <Text>{company.company_address}</Text>
      <Text>{company.company_phone_number}</Text>

      <div className="company__actions">
        <TooltipHost
          content="Edit Company"
          id={tooltipId}
        >
          <IconButton iconProps={editIcon} title="Edit Company" ariaLabel="Edit Company" />
        </TooltipHost>
        <TooltipHost
          content="Disable Company"
          id={tooltipId}
        >
          <ConfirmActionDialog
            title='Disable Company'
            message={{
              values: "Are you sure you want to disable this company? All users of the company will be disabled as a result.",
              id: 'lksdlksdo'
            }}
            negativeText='Cancel'
            positiveText='Delete Company'
            onPositive={() => onDelete(company)}
            renderTrigger={(trigger, renderDialog) => (
              <>
                <IconButton
                  iconProps={disableIcon}
                  title="Disable company"
                  ariaLabel="Disable company"
                  onClick={trigger}
                />
                {renderDialog()}
              </>
            )}
          />
        </TooltipHost>
        <TooltipHost
          content="Delete Company"
          id={tooltipId}
        >
          <IconButton iconProps={deleteIcon} title="Delete Company" ariaLabel="Delete Company" />
        </TooltipHost>
      </div>
    </li>
  )
}
