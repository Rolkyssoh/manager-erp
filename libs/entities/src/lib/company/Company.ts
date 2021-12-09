import { IUser } from "../user/User";

export interface ICompany {
  company_name: string;
  company_address: string;
  id: string;
  company_phone_number: number;
  users?: IUser[]
  disabled: boolean;
}
