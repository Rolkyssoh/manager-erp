import { ICompany } from '../company/Company';
import { CompanyEntity, RoleEntity } from '@merp/entities';
import { IRole } from './Role';

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  company?: ICompany;
  role: IRole;
  id: string;
  disabled: boolean;
}
