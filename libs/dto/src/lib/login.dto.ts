import { CompanyEntity, RoleEntity } from "@merp/entities";

export class LoginDtoIn {
  email: string;
  password: string;
}

export class LoginDtoOut {
  token: string;
  user: {
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    role: RoleEntity;
    company: CompanyEntity;
    disabled:boolean;
  }
}
