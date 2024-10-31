# Pokemon

1. Créez un bouton dans le composant App permettant de récupérer les informations d'un pokemon. Affichez quelques informations.

```js
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { pokemonApi } from './services/pokemon'

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
})

setupListeners(store.dispatch)
```

**reducer**: { [pokemonApi.reducerPath]: pokemonApi.reducer }: Cela configure les reducers pour votre store. Le reducer généré automatiquement par RTK Query pour notre API Pokemon. 
- pokemonApi.reducerPath est le chemin du reducer spécifique à votre API.
- pokemonApi.reducer est le reducer lui-même.

**middleware**: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware): Configuration du middleware pour notre store.Ce middleware est utilisé par RTK Query pour gérer les requêtes réseau et les mises en cache.

**setupListeners** Cette fonction est utilisée pour mettre en place des listeners pour les événements du navigateur qui peuvent déclencher des rechargements de données, tels que refetchOnFocus et refetchOnReconnect.

## API yams

Dans le même projet on va tester l'API yams. 

1. Installez l'API, récupérez l'API yams et vous faites un `npm install` puis vous lancez le serveur de test avec la commande `npm run dev`
1. Puis faites un nouveau composant Pastry pour afficher l'ensembles des patisseries; indication utilisez l'uri suivante `game/pastries`.