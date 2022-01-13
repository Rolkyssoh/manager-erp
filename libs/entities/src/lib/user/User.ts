import { ICompany } from '../company/Company';
import { CompanyEntity, RoleEntity } from '@merp/entities';
import { IRole } from './Role';

export class IUser {
  first_name: string;
  last_name: string;
  email: string;
  company?: ICompany;
  role: Partial<RoleEntity>;
  id: string;
  disabled: boolean;
}
