import BaseService from './BaseService';
import { companyUrls } from './urls';
import { NewCompanyDto } from '@merp/dto';

class CompanyService {
  static new_company = (info: unknown) =>
    // console.log(
    //   'dans le CompanyService:',
    //   BaseService.postRequest(companyUrls.ADD_NEW_COMPANY, info, true)
    // );
    // BaseService.postFileRequest(companyUrls.ADD_NEW_COMPANY, info, true);
    BaseService.postRequest(companyUrls.ADD_NEW_COMPANY, info, true);

  // static update_company = (id: string, info: FormData) =>
  //   BaseService.putFileRequest(companyUrls.UPDATE_COMPANY(id), info, true);

  // static toggleDisableStatus = (id: string, info: { disabled: boolean }) =>
  //   BaseService.putRequest(companyUrls.TOGGLE_DISABLE_COMPANY(id), info, true);

  // static list_agencies = () =>
  //   BaseService.getRequest(companyUrls.LIST_AGENCIES, true);
  // static delete_company = (id: string) =>
  //   BaseService.deleteRequest(companyUrls.DELETE_COMPANY(id), {}, true);
}

export default CompanyService;
