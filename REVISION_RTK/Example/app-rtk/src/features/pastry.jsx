import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const uri = 'http://localhost:3001'

export const pastryApi = createApi({
  reducerPath: 'pastryApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${uri}/api`, credentials : 'include' }), // Assure-toi d'adapter l'URL de l'API
  endpoints: (builder) => ({
    getPastries: builder.query({
      query: () => '/pastries',
    }),
    // Définis d'autres endpoints si nécessaire
  }),
});

export const { useGetPastriesQuery } = pastryApi;
