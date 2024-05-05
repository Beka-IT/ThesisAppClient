import {
  fetchBaseQuery,
  createApi,
} from '@reduxjs/toolkit/query/react';
import { BASE_API } from 'src/constants';
import { useCookie } from 'src/hooks';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const profile = useCookie<Profile>('profile').getCookie();
    //@ts-ignore
    if (profile?.token) {
      headers.set('authorization', `Bearer ${profile?.token}`);
    }
    return headers;
  },
});


export const apiSlice = createApi({
  reducerPath: 'authApi',
  tagTypes: [],
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
