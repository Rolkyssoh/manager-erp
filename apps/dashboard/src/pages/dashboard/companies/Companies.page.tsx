import React, { useEffect, useState } from 'react';
import { RouteProps } from 'react-router';
import {
  DefaultButton,
  PrimaryButton, SearchBox, Spinner, SpinnerSize, Text
} from '@fluentui/react';
import { useId } from '@fluentui/react-hooks'
import { ICompany } from '@merp/entities';
import { CompanyService } from './../../../../services'
import { CompaniesDtoIn, NewCompanyDtoIn } from '@merp/dto';
import { CreateCompanyDialog } from '../../../../dialogs';
import { CompanyComponent } from '../../../../components';

export interface ICompaniesProps extends RouteProps {
  default_props?: boolean;
}


const ErrorComponent = () => (
  <Text variant="xLarge" className="company__center">There was an error fetching company</Text>
)

const EmptyComponent = () => (
  <Text variant="xLarge" className="company__center">There are no companies. Start by clicking on "Create Company" button above to create one</Text>
)

const LoadingComponent = () => (
  <Spinner size={SpinnerSize.large} className='company__center' />
)


export const CompaniesPage: React.FC<ICompaniesProps> = () => {
  const [search, setSearch] = useState<string>('')
  const [showingDisabled, setShowingDisabled] = useState<boolean>(false)

  const [companies, setCompanies] = useState<ICompany[]>([])
  const [filteredCompanies, setFilteredCompanies] = useState<ICompany[]>([])
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)


  const getCompanies = async () => {
    CompanyService.get_companies()
      .then(
        response => {
          if (response.status !== 200) {
            //@TODO #4
            alert('error getting companies')
            setError(true)
            setLoading(false)
            return ([])
          }

          return response.json()
        }
      )
      .then(
        ({ companies: resCompanies }: CompaniesDtoIn) => {
          setCompanies(resCompanies)
          setLoading(false)
        })
      .catch(err => {
        setLoading(false)
        //@TODO #4
        console.log({ err })
        setError(true)
      })
  }

  useEffect(
    () => {
      getCompanies()
    }, []
  )

  useEffect(
    () => {
      const byKeyword = search ? filter(search) : companies
      const byDisable = showingDisabled ? byKeyword.filter(_ => _.disabled) : byKeyword
      setFilteredCompanies(byDisable)
    }, [search, showingDisabled, companies]
  )

  const handleOnCreate = (data: NewCompanyDtoIn) => {
    setSearch('')
    setShowingDisabled(false)
    setCompanies([data.company,...companies])
  }

  const handleDisable = ({ id }: ICompany) => {
    CompanyService.disable_company(id)
      .then(
        async response => {
          if (response.status !== 200) {
            //@TODO #4
            alert('Error deleting company')
            return;
          }
          const company = await response.json() as ICompany
          //@TODO #4 : Success deleting company
          setCompanies(
            companies.map(_ => _.id !== id ? company : _)
          )
          return response.json()
        }
      )
      .catch(err => {
        //@TODO #4
        console.log({ err })
      })

  }

  const handleEnable = ({ id }: ICompany) => {
    CompanyService.enable_company(id)
      .then(
        async response => {
          if (response.status !== 200) {
            //@TODO #4
            alert('Error deleting company')
            return;
          }
          //@TODO #4 : Success deleting company
          const company = await response.json() as ICompany;
          setCompanies(
            companies.map(_ => _.id !== id ? company : _)
          )
          return response.json()
        }
      )
      .catch(err => {
        //@TODO #4
        console.log({ err })
      })

  }

  const filter = (keyword: string) => {
    return companies.filter(
      _ => `${_.company_address} ${_.company_name} ${_.company_phone_number}`.indexOf(keyword) !== -1
    )
  }

  const onDisable = (state: boolean) => {
    setShowingDisabled(state)
  }




  return (
    <div className="companies__container">
      <header className="page__header">
        <Text variant="xLarge">Companies</Text>
        <SearchBox
          placeholder="Search"
          onEscape={ev => setSearch('')}
          onClear={ev => setSearch('')}
          onChange={(_, newValue) => setSearch(newValue || '')}
        />
      </header>
      <nav className='companies__nav'>
        <CreateCompanyDialog
          onCreate={handleOnCreate}
          renderTrigger={trigger => (
            <PrimaryButton text="Create Company" onClick={trigger} />
          )}
        />
        <DefaultButton text="All Companies" onClick={() => onDisable(false)} checked={!showingDisabled} />
        <DefaultButton text="Disabled Companies" onClick={() => onDisable(true)} checked={showingDisabled} />
      </nav>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          {error ? (
            <ErrorComponent />
          ) : (
            <>
              {filteredCompanies.length ? (
                <ul className="companies__list">
                  {filteredCompanies.map(company => (
                    <CompanyComponent company={company} onDelete={handleDisable} />
                  ))}
                </ul>
              ) : (
                <EmptyComponent />
              )}
            </>
          )}
        </>
      )}

    </div>
  );
};


