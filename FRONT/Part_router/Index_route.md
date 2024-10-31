# Les routes

- Architecture des routes

```txt
├── __root.tsx
├── index.tsx
├── modules
│   └── $moduleId.tsx
├── test.lazy.tsx
└── users
    └── $userId.tsx
```

### 1. `__root.tsx`
- **Description** : Ce fichier représente la route racine de l'application et agit comme un conteneur principal.
- **Fonction** : Il inclut généralement la mise en page ou le design global de l’application, tel qu’un en-tête ou un pied de page communs. Il utilise souvent un `Outlet` pour afficher le contenu des sous-routes.

### 2. `index.tsx`
- **Description** : Ce fichier est la route d'accueil ou la page d'index.
- **Chemin de la route** : `/`
- **Fonction** : Il contient généralement la page d'accueil ou la page de connexion de l'application, et c'est la première page que les utilisateurs voient en accédant à la racine du site.

### 3. `modules/$moduleId.tsx`
- **Description** : Ce fichier représente une route dynamique pour un module spécifique.
- **Chemin de la route** : `/modules/:moduleId`
- **Fonction** : Il rend la page d’un module spécifique, en utilisant `moduleId` comme paramètre pour afficher le contenu correspondant. Il est utile pour des pages de détails qui dépendent d'un identifiant dynamique, comme un module de cours ou une section de formation.

### 4. `test.lazy.tsx`
- **Description** : C'est une route paresseuse (lazy-loaded), ce qui signifie qu'elle est chargée seulement quand elle est nécessaire.
- **Fonction** : Cette route optimise les performances de l'application en chargeant le code de la page uniquement lorsque l'utilisateur navigue vers cette route. Elle est utilisée pour des pages moins fréquemment visitées ou avec un contenu lourd.

### 5. `users/$userId.tsx`
- **Description** : Ce fichier représente une route dynamique pour un utilisateur spécifique.
- **Chemin de la route** : `/users/:userId`
- **Fonction** : Il affiche la page de profil ou de détails d’un utilisateur, en utilisant `userId` comme paramètre. C'est utile pour accéder aux données spécifiques d’un utilisateur dans un système de gestion d’utilisateurs.

## Fichier index.tsx

### 1. **Import de `createFileRoute`**

```typescript
import { createFileRoute } from '@tanstack/react-router';
```

La fonction `createFileRoute` est importée depuis TanStack Router. Elle permet de définir des routes en utilisant un système de fichiers dynamique, c’est-à-dire que la route est créée automatiquement à partir de ce fichier, en prenant son chemin (`path`) et en le liant à un composant React.

### 2. **Déclaration de la Route `Route`**

```typescript
export const Route = createFileRoute('/' as never)({
  component: Home,
});
```

Ici, `createFileRoute` est utilisé pour créer la route `/`, qui sera associée à la composante `Home`. Passons en revue cette déclaration :

- **Path** : `createFileRoute('/' as never)` définit la route avec un chemin `/` (la page d'accueil). Le `as never` est utilisé pour indiquer au TypeScript que le chemin ne contient aucun paramètre dynamique (comme des ID) qui aurait besoin d’être typé.
  
- **Component** : Ensuite, dans l'objet passé à `createFileRoute`, on déclare `{ component: Home }`. Cela indique que cette route doit rendre le composant `Home` lorsque l’utilisateur accède à la route `/`.

### 3. **Composant `Home`**

```typescript
function Home() {
  return (<div>Home</div>);
}
```

Ce composant React `Home` représente le contenu qui sera affiché pour cette route. Dans cet exemple, il retourne simplement une `div` avec le texte "Home".

### 4. **Système de génération de fichiers et routes dynamiques**

L'un des avantages ici est l’intégration automatique des routes. En ajoutant un fichier dans un dossier spécifique (`routes`), TanStack Router va générer un fichier `routeTree.gen.ts` contenant la configuration des routes actuelles. Ainsi, chaque fois que l’on ajoute une nouvelle route dans ce dossier, TanStack Router met à jour ce fichier généré. Il n’est pas nécessaire de modifier `routeTree.gen.ts` manuellement, car il est régénéré automatiquement à chaque changement.

### 5. **Accès aux paramètres URL (mentionné dans le commentaire)**

Si l'on souhaite utiliser des routes avec des paramètres dynamiques (comme `/modules/$moduleId`), on pourrait, par exemple, créer un fichier `modules/$moduleId.ts` dans le dossier `routes`. TanStack Router reconnaîtra automatiquement que `$moduleId` est un paramètre et le mettra à disposition dans le composant de la route, facilitant l'accès aux informations dynamiques dans l'URL.

### Résumé

Ce fichier `index.ts` sert à :
- Définir une route `/` qui rend le composant `Home`.
- Utiliser un système de génération automatique pour gérer les chemins et les composants, ce qui simplifie la gestion des routes dans des applications complexes en évitant la déclaration manuelle de chaque route dans un fichier central.