import { CompanyEntity, RoleEntity } from '@merp/entities';

export class LoginDtoIn {
  email: string;
  password: string;
}

export class LoginDtoOut {
  token: string;
  user: {
    first_name: string;
    last_name: string;
    id: string;
    email: string;
    role: { id: number; name: string };
    company?: Partial<CompanyEntity>;
    disabled?: boolean;
  };
}
