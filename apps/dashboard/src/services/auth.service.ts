import BaseService from './BaseService'
import { authUrls } from './urls'

export class AuthService {
  static login = (info: unknown) => BaseService.postRequest(authUrls.LOGIN_USER, info, false);
  static loginByOtp = (info: unknown, agency_id: string) => BaseService.postRequest(authUrls.LOGIN_BY_OTP(agency_id), info, false);
  static sendOtp = (data: unknown, agency_id: string) => BaseService.postRequest(authUrls.REQUEST_OTP(agency_id), data, false);
  static currentUser = () => BaseService.getRequest(authUrls.CURRENT_USER, true);
}

