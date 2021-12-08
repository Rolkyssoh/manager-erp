import { ICompany } from "../company/Company";

export class IUser {
  first_name: string;
  last_name: string;
  email: string;
  company: ICompany;
  id:string;
}
