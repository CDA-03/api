import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const uri = 'https://pokeapi.co/api/v2/'

export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: uri }),
    endpoints: (builder) => ({
      getPokemonByName: builder.query({
        query: (name) => `pokemon/${name}`,
      }),
    }),
  })

  export const { useGetPokemonByNameQuery } = pokemonApi

  