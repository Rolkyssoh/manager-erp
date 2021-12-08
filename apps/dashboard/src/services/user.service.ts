import BaseService from './BaseService';
import { userUrls } from './urls';
import { NewUserDto } from '@merp/dto';

class UserService {
  static new_sector_delegate = (info: NewUserDto) =>
    BaseService.postRequest(userUrls.NEW_SECTOR_DELEGATE, info, true);

  static new_deliverer = (info: NewUserDto) =>
    BaseService.postRequest(userUrls.NEW_DELIVERER, info, true);

  static new_customer = (info: NewUserDto) =>
    BaseService.postRequest(userUrls.NEW_CUSTOMER, info, true);

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
