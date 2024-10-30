import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const uri = 'http://localhost:3001'

export const userApi = createApi({
  reducerPath: 'userapi',
  baseQuery: fetchBaseQuery({
    baseUrl: uri, 
    credentials : 'include',
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUserData: builder.query({
      query: () => '/me',
    }),
  }),
});

export const { useLoginMutation, useGetUserDataQuery } = userApi
