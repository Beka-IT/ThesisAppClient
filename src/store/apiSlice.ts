import {
  FetchArgs,
  fetchBaseQuery,
  createApi,
} from '@reduxjs/toolkit/query/react';
import { Path } from 'src/path';
import { useCookie, useSessionStorage } from 'src/hooks';
import { logOut, setCredentials } from './reducers/auth-slice';

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API_TEST}`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const token = useSessionStorage('profile').getItem().accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: any,
  extraOptions: Record<string, any>,
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { removeItem } = useSessionStorage('profile');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { removeItem: removeToken } = useSessionStorage('profile');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const refreshToken = useCookie('refreshToken').getCookie();
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    removeItem();
    removeToken();
    const refreshResult = await baseQuery(
      {
        url: Path.Auth.refreshToken,
        method: 'POST',
        body: {
          refreshToken: refreshToken,
        },
      },
      api,
      extraOptions,
    );
    if (refreshResult?.data) {
      const profile = api.getState().auth.profile;
      api.dispatch(
        setCredentials({ ...refreshResult.data, profile, theme: 'dark' }),
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'authApi',
  tagTypes: [],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
