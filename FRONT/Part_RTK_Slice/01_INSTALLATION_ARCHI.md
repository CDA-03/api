# Structure 

## Installation

```bash
# client 
npm create vite@latest

# store
npm install @reduxjs/toolkit react-redux

```

## Architecture 

- Nous allons utiliser l'atomic design, tailwind, Radix-ui et Shadcn
- Nous gérons le store avec reduxtoolkit 

```bash
.
├── api
│   └── endpoints
├── assets
├── components
│   ├── atoms
│   ├── molecules
│   ├── organisms
│   ├── templates
│   └── wrappers
├── routes
│   ├── modules
│   └── users
├── store
│   └── slices

```

Une commande pour vous simplifiez la création de la structure, dans le dossier src 

```bash
mkdir -p api/endpoints \
    components/atoms \
    components/molecules \
    components/organisms \
    components/templates \
    store/slices
```

## L'API côté front

De manière synthétique on a :

```bash
api
├── apiSlice.ts
└── endpoints
    ├── auth.ts
    └── modules.ts
```

Commande cli pour créer ces fichiers

```txt
touch api/apiSlice.ts api/endpoints/auth.ts api/endpoints/modules.ts

```

### Structure des Dossiers et Commentaires

```txt
api
├── apiSlice.ts             # Fichier principal du slice API qui configure le store Redux pour gérer les requêtes API. Il définit les bases de l'API et intègre les endpoints.
└── endpoints                # Dossier contenant les définitions des différents endpoints de l'API.
    ├── auth.ts             # Fichier pour gérer les requêtes liées à l'authentification (connexion, inscription, déconnexion, etc.).
    └── modules.ts          # Fichier pour gérer les requêtes liées à des modules spécifiques de l'application (par exemple, CRUD sur des entités spécifiques).
```

### Explication des Fichiers

1. **`apiSlice.ts`**
   - Ce fichier définit le *slice* principal pour l'API. Il utilise `createApi` de Redux Toolkit pour créer une instance de gestion d'API qui va interagir avec votre backend.
   - Il sert de point central pour la gestion des requêtes, des mutations et des cache des données.
   - Dans ce fichier, vous pouvez configurer les *baseQuery*, les *endpoints*, et les *reducers* qui gèrent les états de chargement et d'erreur.

2. **`endpoints/`**
   - Ce dossier regroupe les fichiers qui définissent des endpoints spécifiques de l'API. Cela aide à organiser les requêtes par fonctionnalité.

   - **`auth.ts`**
     - Ce fichier est dédié aux opérations d'authentification. Vous y définirez les requêtes pour :
       - Connexion des utilisateurs (login).
       - Inscription des nouveaux utilisateurs (registration).
       - Gestion des tokens JWT.
       - Déconnexion des utilisateurs (logout).
     - Chaque opération peut être définie comme un *endpoint* dans le *slice* API.

   - **`modules.ts`**
     - Ce fichier gère les requêtes pour des entités ou des fonctionnalités spécifiques à votre application, comme :
       - CRUD (Créer, Lire, Mettre à jour, Supprimer) pour divers modules.
       - Requêtes pour récupérer des données spécifiques liées aux modules de votre application.
     - Chaque fonction définie dans ce fichier peut également être intégrée dans le *slice* API pour gérer les interactions avec le backend.
