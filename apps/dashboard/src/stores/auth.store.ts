import { LoginDtoOut } from '@merp/dto';
import create, { SetState, GetState } from 'zustand';

const USER_KEY = 'user';
const TOKEN_KEY = 'access_token';

type AuthStore = {
  user: LoginDtoOut['user'];
  token: LoginDtoOut['token'];
  updateCurrentUser: (user: LoginDtoOut['user']) => void;
  updateToken: (token: LoginDtoOut['token']) => void;
};

export const useAuthStore = create<AuthStore>((set: SetState<AuthStore>) => {
  const current_user = localStorage.getItem(USER_KEY);
  const current_token = localStorage.getItem(TOKEN_KEY);

  return {
    user: current_user ? JSON.parse(current_user) : null,
    token: current_token ? JSON.parse(current_token) : null,

    updateCurrentUser: (user): void => {
      set({ user });
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    },

    updateToken: (token): void => {
      set({ token });
      localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
      // if (token) console.log('le token stocké :', JSON.parse(token));
      console.log('le token stocké :', JSON.stringify(token));
    },
  };
});
