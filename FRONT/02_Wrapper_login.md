### Objectif du Composant `AuthWrapper`

L'objectif du composant `AuthWrapper` est de :

1. **Gérer l'État d'Authentification** : Vérifier si un utilisateur est authentifié en utilisant une requête API.
2. **Interagir avec Redux** : Mettre à jour le store Redux en fonction des résultats de la requête API (ajouter ou retirer des informations sur l'utilisateur).
3. **Afficher un État de Chargement** : Afficher un message de chargement tant que la vérification de l'authentification est en cours.
4. **Envelopper les Composants Enfant** : Permettre de rendre les composants enfants uniquement lorsque l'état d'authentification est connu, en s'assurant que les informations d'utilisateur sont correctement gérées avant de les afficher.

En résumé, le composant `AuthWrapper` sert à centraliser la logique de vérification de l'authentification et à gérer l'état utilisateur dans l'application, tout en permettant une expérience utilisateur fluide.

### TP : Intégration du Composant `AuthWrapper` avec une API Symfony (que nous fairons plus tard)

#### Objectif

Ce TP a pour but de créer un composant `AuthWrapper` qui permettra de gérer l'authentification des utilisateurs dans une application React, en utilisant une API Symfony qui fournit des endpoints pour la connexion et la vérification de l'utilisateur.

#### Prérequis

- Avoir une API Symfony configurée avec JWT pour l'authentification - consommez là en ligne pour l'instant.

#### Étape 1 : Créer le Slice pour l'Authentification

1. **Créer un fichier `authSlice.ts` dans le dossier `store/slices`**.
   
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: null | object; // Remplacez par l'interface utilisateur appropriée
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<object>) {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        clearUser(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
```

#### Étape 2 : Créer les Endpoints dans `apiSlice.ts`

1. **Ajouter une fonction pour vérifier l'authentification dans `auth.ts`** :

```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }), // Remplacez par l'URL de votre API
    endpoints: (builder) => ({
        checkAuth: builder.query<any, void>({
            query: () => '/me', // Endpoint pour vérifier l'utilisateur
        }),
    }),
});

export const { useCheckAuthQuery } = api;
export default api;
```

#### Étape 3 : Créer le Composant `AuthWrapper`

1. **Créer le fichier `AuthWrapper.tsx` dans le dossier `components`** :

```typescript
import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../../store/slices/authSlice';
import { useCheckAuthQuery } from '../../api/endpoints/auth';

type AuthWrapperProps = {
    children: ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
    const { data, error, isSuccess, isFetching } = useCheckAuthQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            dispatch(clearUser()); // Réinitialise l'état si une erreur se produit
        } else if (isSuccess && data) {
            dispatch(setUser(data)); // Met à jour l'utilisateur en cas de succès
        }
    }, [error, data, isSuccess, dispatch]);

    if (isFetching) return <p>Chargement en cours ...</p>;

    return <>{children}</>;
};
```

#### Étape 4 : Utiliser `AuthWrapper` dans l'Application

1. **Modifier votre fichier `App.tsx` ou un composant parent** pour envelopper vos routes ou composants avec `AuthWrapper` :

```typescript
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthWrapper } from './components/AuthWrapper';
import YourRoutes from './routes/YourRoutes'; // Remplacez par vos routes

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <AuthWrapper>
                <YourRoutes />
            </AuthWrapper>
        </Provider>
    );
};

export default App;
```

#### Étape 5 : Tester l'Intégration

1. **Lancer votre API Symfony** et votre application React.
2. **Accéder à l'application React** et vérifier que le composant `AuthWrapper` fonctionne correctement :
   - Si l'utilisateur est connecté, il devrait pouvoir accéder aux routes protégées.
   - Si l'utilisateur n'est pas connecté ou si l'authentification échoue, l'état d'authentification devrait être réinitialisé.

#### Bonus : Ajouter des Messages d'Erreur

Vous pouvez également ajouter des messages d'erreur pour informer l'utilisateur en cas d'échec de l'authentification.
