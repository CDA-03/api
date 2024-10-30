import { setupListeners } from '@reduxjs/toolkit/query'
import { configureStore } from '@reduxjs/toolkit'
import { pokemonApi } from './pokemon'
import { pastryApi } from './pastry'
import { userApi } from './auth'

export const store = configureStore({
    reducer : {
        
        [pokemonApi.reducerPath] : pokemonApi.reducer,
        [userApi.reducerPath]: userApi.reducer, 
        [pastryApi.reducerPath] : pastryApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...[
        pokemonApi.middleware, 
        userApi.middleware,
        pastryApi.middleware
    ]),
})

setupListeners(store.dispatch)