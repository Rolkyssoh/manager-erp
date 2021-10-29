// import { AgencyEntity, UserEntity } from '@clams/entities';
import { CompanyEntity } from '@merp/entities';
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

// export class NewAgencyDtoIn {
//   admin: UserEntity
//   agency: AgencyEntity
// }

// export class AgencyDtoIn extends AgencyEntity{}
export class CompanyDtoIn extends CompanyEntity {}
