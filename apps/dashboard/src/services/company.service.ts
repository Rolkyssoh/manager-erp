import BaseService from './BaseService';
import { companyUrls } from './urls';

export class CompanyService {
  static new_company = (info: unknown) => BaseService.postRequest(companyUrls.ADD_NEW_COMPANY, info, true);
  static get_companies = () => BaseService.getRequest(companyUrls.GET_COMPANIES, true);
  static delete_company = (id:string) => BaseService.deleteRequest(companyUrls.DELETE_COMPANY(id), {}, true);
  static disable_company = (id:string) => BaseService.patchRequest(companyUrls.DISABLE_COMPANY(id), {}, true);
  static enable_company = (id:string) => BaseService.patchRequest(companyUrls.ENABLE_COMPANY(id), {}, true);
}

