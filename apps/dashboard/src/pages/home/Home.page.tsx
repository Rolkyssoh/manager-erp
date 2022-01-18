import { DefaultButton, PrimaryButton } from '@fluentui/react';
import { LoginDialog } from '../../dialogs';
import React, { useEffect, useState } from 'react';
import { RouteProps } from 'react-router';
import {
  CompanyCardComponent,
  EmptyComponent,
  HeaderComponent,
  LoadingComponent,
} from '../../components';
import { CompaniesDtoIn } from '@merp/dto';
import { CompanyService } from '../../services';
import { ICompany } from '@merp/entities';

export interface IHomePageProps extends RouteProps {
  default_props?: boolean;
}

export const HomePage: React.FC<IHomePageProps> = () => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const getCompaniesHome = async () => {
    CompanyService.get_companies()
      .then((response) => {
        if (response.status !== 200) {
          //@TODO #4
          // alert('error getting companies');
          setError(true);
          setLoading(false);
          return [];
        }

        return response.json();
      })
      .then(({ companies: resCompanies }: CompaniesDtoIn) => {
        console.log('the response:', resCompanies);
        const enableCompanies = resCompanies.filter((_) => !_.disabled);
        setCompanies(enableCompanies);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        //@TODO #4
        console.log({ err });
        setError(true);
      });
  };

  useEffect(() => {
    getCompaniesHome();
  }, []);

  return (
    <div className="homepage">
      <HeaderComponent />
      <div className="homebody">
        <div className="searchzone">
          <span className="home-indication">En Livraison Chez vous </span>
          <div className="home-action">
            <LoginDialog
              renderTrigger={(trigger) => (
                <DefaultButton
                  text="Se connecter"
                  className="home-action-button"
                  onClick={trigger}
                />
              )}
            />
          </div>

          <div className="search-zone-items">
            <div className="company-item">
              <div className="icone-company">Icone here</div>
              <div className="name-company">Name here</div>
            </div>

            <div className="company-item">
              <div className="icone-company">Icone here</div>
              <div className="name-company">Name here</div>
            </div>
            <div className="company-item">
              <div className="icone-company">Icone here</div>
              <div className="name-company">Name here</div>
            </div>
            <div className="company-item">
              <div className="icone-company">Icone here</div>
              <div className="name-company">Name here</div>
            </div>

            <div className="company-item">
              <div className="icone-company">Icone here</div>
              <div className="name-company">Name here</div>
            </div>

            <div className="company-item">
              <div className="icone-company">Icone here</div>
              <div className="name-company">Name here</div>
            </div>
          </div>
        </div>
        <div>Alimentation près de vous</div>
        <div className="productszone">
          {loading ? (
            <LoadingComponent />
          ) : (
            <>
              {companies.length ? (
                companies.map((company) => (
                  <CompanyCardComponent key={company.id} company={company} />
                ))
              ) : (
                <EmptyComponent />
              )}
            </>
          )}
        </div>
      </div>
      <div className="footer">Footer</div>
    </div>
  );
};