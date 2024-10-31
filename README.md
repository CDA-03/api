# JWT API Platform



### Étape 1 : Installation et configuration de LexikJWTAuthenticationBundle

1. **Installez le bundle LexikJWT pour Symfony** :
   ```bash
   # API Platform
   composer require api

   composer require lexik/jwt-authentication-bundle
   ```

2. **Générez les clés de sécurité** :
   ```bash
   php bin/console lexik:jwt:generate-keypair
   ```
   Cette commande va créer une clé privée (`config/jwt/private.pem`) et une clé publique (`config/jwt/public.pem`). Assurez-vous de garder ces clés sécurisées.

3. **Configuration du bundle dans `config/packages/lexik_jwt_authentication.yaml`** :
   ```yaml
   lexik_jwt_authentication:
    secret_key: '%env(resolve:JWT_SECRET_KEY)%'
    public_key: '%env(resolve:JWT_PUBLIC_KEY)%'
    pass_phrase: '%env(JWT_PASSPHRASE)%'
   ```

### Étape 2 : Configuration de la sécurité de Symfony

1. **Modifiez le fichier `config/packages/security.yaml`** pour sécuriser les routes de l’API avec les tokens JWT :
   ```yaml
   security:
       enable_authenticator_manager: true
       password_hashers:
           Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface: 'auto'

       providers:
           users:
               entity:
                   class: App\Entity\User
                   property: email

       firewalls:
           dev:
               pattern: ^/(_(profiler|wdt)|css|images|js)/
               security: false

           login:
               pattern: ^/auth/login
               stateless: true
               json_login:
                   check_path: /auth/login
                   username_path: email
                   password_path: password
                   success_handler: lexik_jwt_authentication.handler.authentication_success
                   failure_handler: lexik_jwt_authentication.handler.authentication_failure

           api:
               pattern: ^/api
               stateless: true
               jwt: ~

       access_control:
           - { path: ^/auth/login, roles: PUBLIC_ACCESS }
           - { path: ^/api,       roles: IS_AUTHENTICATED_FULLY }
   ```

2. **Ajoutez un point d’entrée d’authentification `/auth/login`** pour obtenir le token JWT.

### Étape 3 : Créez l’API avec API Platform

API Platform va automatiquement exposer vos entités sous forme de ressources REST. Par exemple, avec une entité `User`, vous pourriez accéder à l’API via `/api/users`.

### Étape 4 : Créez un formulaire React pour se connecter via RTK Query

1. **Configurez RTK Query dans votre projet React** pour les appels API :
   ```javascript
   // src/services/authApi.js
   import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

   export const authApi = createApi({
     reducerPath: 'authApi',
     baseQuery: fetchBaseQuery({
       baseUrl: 'http://localhost:8000', // URL de l'API Symfony
       prepareHeaders: (headers, { getState }) => {
         const token = getState().auth.token;
         if (token) {
           headers.set('Authorization', `Bearer ${token}`);
         }
         return headers;
       },
     }),
     endpoints: (builder) => ({
       login: builder.mutation({
         query: (credentials) => ({
           url: '/auth/login',
           method: 'POST',
           body: credentials,
         }),
       }),
     }),
   });

   export const { useLoginMutation } = authApi;
   ```

2. **Créez le formulaire de connexion React** :
   ```javascript
   // src/components/LoginForm.js
   import React, { useState } from 'react';
   import { useLoginMutation } from '../services/authApi';
   import { useDispatch } from 'react-redux';
   import { setToken } from '../store/authSlice';

   function LoginForm() {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const dispatch = useDispatch();
     const [login, { isLoading }] = useLoginMutation();

     const handleSubmit = async (e) => {
       e.preventDefault();
       try {
         const { data } = await login({ email, password });
         if (data) {
           dispatch(setToken(data.token));
         }
       } catch (error) {
         console.error('Failed to login:', error);
       }
     };

     return (
       <form onSubmit={handleSubmit}>
         <input
           type="email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           placeholder="Email"
           required
         />
         <input
           type="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           placeholder="Password"
           required
         />
         <button type="submit" disabled={isLoading}>
           Login
         </button>
       </form>
     );
   }

   export default LoginForm;
   ```

3. **Ajoutez un `authSlice` dans Redux** pour stocker le token JWT :
   ```javascript
   // src/store/authSlice.js
   import { createSlice } from '@reduxjs/toolkit';

   export const authSlice = createSlice({
     name: 'auth',
     initialState: {
       token: null,
     },
     reducers: {
       setToken: (state, action) => {
         state.token = action.payload;
       },
       clearToken: (state) => {
         state.token = null;
       },
     },
   });

   export const { setToken, clearToken } = authSlice.actions;
   export default authSlice.reducer;
   ```

### Étape 5 : Configurez Redux Store et combinez avec RTK Query

1. **Combinez le `authSlice` et `authApi` dans le store Redux** :
   ```javascript
   // src/store/store.js
   import { configureStore } from '@reduxjs/toolkit';
   import authReducer from './authSlice';
   import { authApi } from '../services/authApi';

   export const store = configureStore({
     reducer: {
       auth: authReducer,
       [authApi.reducerPath]: authApi.reducer,
     },
     middleware: (getDefaultMiddleware) =>
       getDefaultMiddleware().concat(authApi.middleware),
   });
   ```

### Étape 6 : Testez l'authentification et l'accès aux ressources

1. **Vérifiez que la connexion fonctionne** en envoyant un email et un mot de passe valides. En cas de succès, le token sera stocké dans l'état global de Redux.

2. **Utilisez RTK Query** pour accéder aux ressources sécurisées en envoyant le token JWT dans les headers. Vous pouvez désormais faire des requêtes authentifiées et accéder aux ressources protégées via le header `Authorization`.

Avec cette configuration, votre application React peut utiliser JWT pour s'authentifier auprès de votre API Platform.