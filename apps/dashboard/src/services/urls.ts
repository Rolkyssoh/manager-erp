// import config from 'config'
// /*Urls for the application */
export const prefixer = 'http://127.0.0.1:3000/api/v1/';

export const authUrls = {
  LOGIN_USER: `${prefixer}auth/login`,
  LOGIN_BY_OTP: (agency_id: string) => `${prefixer}auth/${agency_id}/login`,
  REQUEST_OTP: (agency_id: string) => `${prefixer}auth/${agency_id}/send/otp`,
  CURRENT_USER: `${prefixer}auth/logged?refresh_token=${true}`,
};

export const userUrls = {
  NEW_SECTOR_DELEGATE: `${prefixer}user/delegate`,
  NEW_DELIVERER: `${prefixer}user/deliverer`,
  NEW_CUSTOMER: `${prefixer}user/customer`,
  GET_USERS: `${prefixer}user`,
  DELETE_USER: (id: string) => `${prefixer}user/${id}`,
  DISABLE_USER: (id: string) => `${prefixer}user/${id}/disable`,
  ENABLE_USER: (id: string) => `${prefixer}user/${id}/enable`,
};

export const companyUrls = {
  ADD_NEW_COMPANY: `${prefixer}company/add`,
  GET_COMPANIES: `${prefixer}company`,
  DELETE_COMPANY: (id: string) => `${prefixer}company/${id}`,
  DISABLE_COMPANY: (id: string) => `${prefixer}company/${id}/disable`,
  ENABLE_COMPANY: (id: string) => `${prefixer}company/${id}/enable`,
};

export const productUrls = {
  ADD_NEW_PRODUCT: `${prefixer}product/add`,
  GET_PRODUCTS: `${prefixer}product`,
  DELETE_PRODUCT: (id: string) => `${prefixer}product/${id}`,
  DISABLE_PRODUCT: (id: string) => `${prefixer}product/${id}/disable`,
  ENABLE_PRODUCT: (id: string) => `${prefixer}product/${id}/enable`,
};
