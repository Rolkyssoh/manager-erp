export const SECTOR_DELEGATE = 2;
export const DELIVERER = 1;
export const SUPER_ADMIN = -10;
export const COMMERCIAL_DIRECTOR = -7;
export const CUSTOMER = 120;

export const ROLES = [
  SECTOR_DELEGATE,
  DELIVERER,
  SUPER_ADMIN,
  COMMERCIAL_DIRECTOR,
  CUSTOMER,
];

export type IRole = typeof ROLES[number];
