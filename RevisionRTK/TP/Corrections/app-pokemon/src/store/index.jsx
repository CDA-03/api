import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { pokemonApi } from './services/pokemon'

export const store = configureStore({
  reducer: {
    // Ajoutez le réducteur généré en tant que slice spécifique de niveau supérieur
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  // Ajouter le middleware de l'API active le caching, l'invalidation, le polling,
  // et d'autres fonctionnalités utiles de `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
})

// Optionnel, mais nécessaire pour les comportements refetchOnFocus/refetchOnReconnect
// voir la documentation de `setupListeners` - prend éventuellement un rappel en tant que 2e argument pour la personnalisation
setupListeners(store.dispatch)
