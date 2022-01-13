import BaseService from './BaseService';
import { userUrls } from './urls';
import { NewUserDto } from '@merp/dto';

class UserService {
  static new_sector_delegate = (info: unknown) =>
    BaseService.postRequest(userUrls.NEW_SECTOR_DELEGATE, info, true);

  static new_deliverer = (info: unknown) =>
    BaseService.postRequest(userUrls.NEW_DELIVERER, info, true);

  static new_customer = (info: unknown) =>
    BaseService.postRequest(userUrls.NEW_CUSTOMER, info, true);

  static get_users = () => BaseService.getRequest(userUrls.GET_USERS, true);

  static delete_user = (id: string) =>
    BaseService.deleteRequest(userUrls.DELETE_USER(id), {}, true);

  static disable_user = (id: string) =>
    BaseService.patchRequest(userUrls.DISABLE_USER(id), {}, true);

  static enable_user = (id: string) =>
    BaseService.patchRequest(userUrls.ENABLE_USER(id), {}, true);

  //   static update_user = (id: string, info: NewUserDto) =>
  //     BaseService.putRequest(userUrls.UPDATE_USER(id), info, true);

  //   static update_profile = (id: string, info: NewUserDto) =>
  //     BaseService.putFileRequest(userUrls.UPDATE_USER(id), info, true);

  //   static toggleDisableStatus = (id: string, info: { disabled: boolean }) =>
  //     BaseService.putRequest(userUrls.TOGGLE_DISABLE_USER(id), info, true);

  //   static list_users = () => BaseService.getRequest(userUrls.LIST_USERS, true);

  //   static list_patients = () =>
  //     BaseService.getRequest(userUrls.LIST_PATIENTS, true);
  //   static delete_user = (id: string) =>
  //     BaseService.deleteRequest(userUrls.DELETE_USER(id), {}, true);
}

export default UserService;
