import { CUSTOMER, SUPER_ADMIN } from '@merp/constants';
import { LoginDtoOut } from '@merp/dto';
import create, { SetState, GetState } from 'zustand';

type AuthStore = {
  user: LoginDtoOut['user'] | undefined;
  updateCurrentUser: (user: LoginDtoOut['user'] | undefined) => void;
};

const customerUser = {
  id: "4f350dcf-bd41-4065-8102-1952e5050190",
  updated_at: "2021-11-23T15:05:02.201Z",
  disabled: false,
  first_name: "erp",
  last_name: "admin",
  email: "admin@erp.com",
  role: {
    id: CUSTOMER,
    name: "super_admin"
  },
} as LoginDtoOut['user']

export const adminUser = {
  user: {
    id: "4f350dcf-bd41-4065-8102-1952e5050190",
    updated_at: "2021-11-23T15:05:02.201Z",
    disabled: false,
    first_name: "super",
    last_name: "admin",
    email: "admin@erp.com",
    company: {
      id: 'iow982-2oi2-3092-09sd0922'
    },
    role: {
      id: SUPER_ADMIN,
      name: "super_admin"
    },
  },
  token: 'lksdoiwoiweoiweoisdosdf'
} as LoginDtoOut

export const useAuthStore = create<AuthStore>(
  (
    set: SetState<AuthStore>,
    get: GetState<AuthStore>
  ) => ({
    user: customerUser,
    updateCurrentUser: (user) => set({ user })
  })
)
