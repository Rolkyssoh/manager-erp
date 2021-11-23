import { CompanyEntity } from "@merp/entities";
import { IRole } from "@merp/constants";

export class LoginDtoIn {
  email: string;
  password: string;
}

export class LoginDtoOut {
  token: string;
  user: {
    first_name: string;
    last_name: string;
    id:string,
    email: string;
    role: {
      id: IRole,
      name: string
    };
    company?: Partial<CompanyEntity>;
    disabled?: boolean;
  }
}
