import { useSessionStorage } from 'src/hooks';
import { createSlice } from '@reduxjs/toolkit';
import { useCookie } from 'src/hooks';
import { Menu, ProfileType } from 'src/types/profile';
import { defaultMenu } from 'src/assets/fake-menu';

export interface AuthState {
  theme: 'dark' | 'light';
  profile?: ProfileType | null;
  menu?: Menu[] | null;
  loading?: boolean | null;
  error?: string | null;
  token?: string | null;
}

const initialState: AuthState = {
  theme: 'dark',
  profile: null,
  menu: defaultMenu,
  loading: null,
  error: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'authApi',
  initialState,
  reducers: {
    setCredentials: (state, { payload }: { payload: AuthState }) => {
      state.menu = payload.menu;
      state.profile = payload.profile;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useSessionStorage('profile').setItem(payload);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useCookie('refreshToken').setCookie(payload.profile?.refreshToken || '');
      // eslint-disable-next-line react-hooks/rules-of-hooks
    },
    logOut: (state) => {
      state.profile = null;
      state.token = null;
      state.menu = null;
    },
    setTheme: (state, { payload }) => {
      state.theme = payload;
    },
  },
});
export const { setCredentials, logOut, setTheme } = authSlice.actions;
export const authReducer = authSlice.reducer;
