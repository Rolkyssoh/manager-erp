import BaseService from './BaseService';
import { companyUrls, productUrls } from './urls';

export class CompanyService {
  static new_company = (info: unknown) =>
    BaseService.postRequest(companyUrls.ADD_NEW_COMPANY, info, true);
  static get_companies = () =>
    BaseService.getRequest(companyUrls.GET_COMPANIES, false);
  static delete_company = (id: string) =>
    BaseService.deleteRequest(companyUrls.DELETE_COMPANY(id), {}, true);
  static disable_company = (id: string) =>
    BaseService.patchRequest(companyUrls.DISABLE_COMPANY(id), {}, true);
  static enable_company = (id: string) =>
    BaseService.patchRequest(companyUrls.ENABLE_COMPANY(id), {}, true);

  // For Product
  static new_product = (infos: unknown) =>
    BaseService.postRequest(productUrls.ADD_NEW_PRODUCT, infos, true);
  static get_products = () =>
    BaseService.getRequest(productUrls.GET_PRODUCTS, false);
  static edit_product = (id: string, infos: unknown) =>
    BaseService.patchRequest(productUrls.EDIT_PRODUCT(id), infos, true);
  static delete_product = (id: string) =>
    BaseService.deleteRequest(productUrls.DELETE_PRODUCT(id), {}, true);
  static disable_product = (id: string) =>
    BaseService.patchRequest(productUrls.DISABLE_PRODUCT(id), {}, true);
  static enable_product = (id: string) =>
    BaseService.patchRequest(productUrls.ENABLE_PRODUCT(id), {}, true);
}
