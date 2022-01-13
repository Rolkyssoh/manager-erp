// import { AgencyEntity, UserEntity } from '@clams/entities';
import { CompanyEntity, ICompany, IUser } from '@merp/entities';
import { NewUserDto } from './user.dto';
 
// export class AgencyDto {
//   name: string
//   symbol: string
//   logo: string
//   url: string 
// }

export class NewCompanyDto extends NewUserDto {
  company_name: string;
  company_phone_number: number;
  company_address: string;
}

export interface NewCompanyDtoIn {
  user: IUser;
  company: ICompany;
}

export interface CompaniesDtoIn {
  companies: ICompany[];
  count: number;
}
