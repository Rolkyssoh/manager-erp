import { IUser, UserEntity } from '@merp/entities';

export class NewUserDto {
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  role: number;
  company: string;
}

export interface NewUserDtoIn {
  user: IUser;
}

// export class UserDtoIn extends UserEntiry {}
// export class UserDtoIn extends UserEntity {}
export interface UserDtoIn {
  users: IUser[];
}

// export interface UserListDtoIn extends ListDtoIn<UserEntity> {

// }
