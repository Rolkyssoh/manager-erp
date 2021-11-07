// import config from 'config'
// /*Urls for the application */
export const prefixer = 'api/v1/';

export const authUrls = {
  LOGIN_USER: `${prefixer}auth/login`,
  LOGIN_BY_OTP: (agency_id:string) => `${prefixer}auth/${agency_id}/login`,
  REQUEST_OTP: (agency_id:string) => `${prefixer}auth/${agency_id}/send/otp`,
  CURRENT_USER: `${prefixer}auth/logged?refresh_token=${true}`,
}
