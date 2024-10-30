# TP Pokémon

Vous allez utiliser l'API des Pokémon pour afficher une liste de 10 Pokémons avec leurs images respectives ainsi qu'une page qui décrit une partie de leurs caractéristiques.

[apipokemon](https://pokeapi.co/)

Contraintes : utilisez ce que nous avons vu pendant cette semaine. Vous pouvez utiliser au choix createSlice et createAsyncThunk ou RTK dans ce cas. Voyez le chapitre sur RTK dans ce document.

Vous avez une description de l'API Pokémon dans la Partie 1.

Vous devez créer une application présentant les Pokémon de la liste ci-après ou de votre choix. Avec une page qui liste vos Pokémon et une page qui décrit chacun d'entre eux.

Vous devez également utiliser les techniques décrites dans le chapitre des tâches ci-après.

ℹ️ **Conseil :** Vous pouvez utiliser plusieurs techniques pour récupérer les données de l'API.

1. Un useEffect.
1. Un createSlice avec **createAsyncThunk**.
1. RTK.

### Tâches

1. Créez un nouveau projet React à l'aide de Vite.js.
1. Installez Redux Toolkit et react-redux (module pour utiliser Redux dans React).
1. Installez `react-router-dom` en utilisant npm.
1. 💖 Créez une page qui liste les 10 Pokémon les plus célèbres suivants :
   - Pikachu
   - Charizard
   - Bulbasaur
   - Squirtle
   - Jigglypuff
   - Meowth
   - Eevee
   - Snorlax
   - Mewtwo
   - Gyarados

1. Créez une page qui décrit, pour chaque Pokémon, des spécificités de votre choix parmi ceux ci-dessus.

## Partie 1 : Documentation de l'API Pokémon

🚀 L'API Pokémon officielle offre plusieurs endpoints pour accéder aux informations sur les Pokémon. Voici quelques exemples d'endpoints couramment utilisés :

1. **Liste de tous les Pokémon :**
   - Endpoint : `https://pokeapi.co/api/v2/pokemon`
   - Méthode : GET
   - Description : Récupère une liste de tous les Pokémon avec leurs noms et identifiants.

1. **Détails d'un Pokémon spécifique par son ID ou son nom :**
   - Endpoint : `https://pokeapi.co/api/v2/pokemon/{id or name}`
   - Méthode : GET
   - Description : Récupère les détails d'un Pokémon spécifique en fonction de son identifiant (ID) ou de son nom.

1. **Liste de tous les types de Pokémon :**
   - Endpoint : `https://pokeapi.co/api/v2/type`
   - Méthode : GET
   - Description : Récupère une liste de tous les types de Pokémon.

1. **Détails d'un type spécifique par son ID ou son nom :**
   - Endpoint : `https://pokeapi.co/api/v2/type/{id or name}`
   - Méthode : GET
   - Description : Récupère les détails d'un type spécifique en fonction de son identifiant (ID) ou de son nom.

1. **Liste de toutes les capacités de Pokémon :**
   - Endpoint : `https://pokeapi.co/api/v2/ability`
   - Méthode : GET
   - Description : Récupère une liste de toutes les capacités de Pokémon.

1. **Détails d'une capacité spécifique par son ID ou son nom :**
   - Endpoint : `https://pokeapi.co/api/v2/ability/{id or name}`
   - Méthode : GET
   - Description : Récupère les détails d'une capacité spécifique en fonction de son identifiant (ID) ou de son nom.

## Partie 2 useEffect (extraits de code)

- 🚀 Récupération des données de Bulbasaur avec un useEffect

```jsx
useEffect(() => {
    const fetchBulbasaurData = async () => {
        try {
            // Faire une requête à l'API Pokémon pour obtenir les informations sur Bulbasaur
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur');
            const data = await response.json();

        } catch (error) {
            console.error("Erreur lors de la récupération des données de Bulbasaur", error);
        }
    };

    // Appeler la fonction de chargement des données dans useEffect
    fetchBulbasaurData();
}, []);
```

## Partie 3 createSlice et createAsyncThunk (extrait de code)

- 🚀 Récupération des données de Bulbasaur 

```jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBulbasaur = createAsyncThunk('pokemon/fetchBulbasaur', async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur');
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
});

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        bulbasaurData: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // gestion des états de la promesse
            .addCase(fetchBulbasaur.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBulbasaur.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bulbasaurData = action.payload;
            })
            .addCase(fetchBulbasaur.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default pokemonSlice.reducer;
export { fetchBulbasaur };
```

## Partie 4 RTK Query

- 🚀 Récupération des données de Bulbasaur 

```jsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Créer la tranche (slice) de l'API Pokémon en utilisant createApi
export const pokemonApi = createApi({
    // Spécifier le chemin du réducteur, où le réducteur généré sera stocké dans le store Redux
    reducerPath: 'pokemonApi',
    // Définir la requête de base en utilisant fetchBaseQuery et définir l'URL de base pour l'API Pokémon
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    // Définir les points d'extrémité (endpoints) de l'API
    endpoints: (builder) => ({
        // Définir un point d'extrémité pour obtenir des informations sur un Pokémon par son nom
        getPokemonByName: builder.query({
            // Spécifier la fonction de requête pour construire l'extrémité de l'API
            query: (name) => `pokemon/${name}`,
        }),
    }),
})
// Exporter le hook de requête généré pour obtenir un Pokémon par son nom
export const { useGetPokemonByNameQuery } = pokemonApi
```

# Bon travail! 🎉 