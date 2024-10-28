# Atomic design 
L'Atomic Design est une méthodologie pour structurer et organiser les composants dans une application, particulièrement adaptée aux bibliothèques comme React. Elle décompose l'interface en éléments modulaires et réutilisables, classés par niveaux de complexité. Voici une introduction détaillée au concept d'Atomic Design, avec une application en TypeScript et en s’appuyant sur la structure de votre projet

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p 
```

Dans le fichier de tailwind

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Puis dans le fichier index.css, remplacez les styles par ce qui suit:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Introduction à l'Atomic Design

L'Atomic Design propose de structurer les composants d'une application en cinq niveaux de complexité croissante :

1. **Atoms (Atomes)** : Ce sont les plus petits composants indépendants et ne peuvent pas être décomposés davantage.
2. **Molecules (Molécules)** : Ce sont des groupes d’atomes combinés qui forment des unités fonctionnelles simples.
3. **Organisms (Organismes)** : Ce sont des groupes de molécules formant des sections plus complexes et plus significatives de l’interface.
4. **Templates (Modèles)** : Ce sont des arrangements d’organismes et de molécules pour former des structures de pages sans données réelles.
5. **Pages** : Ce sont des instances de modèles contenant des données réelles, correspondant aux écrans finaux.

La structure de votre projet comprend les dossiers jusqu’aux templates, ce qui vous permet de bien découper les composants pour la gestion d'interfaces modulaires.

### 1. **Atoms (Atomes)**

Les **Atomes** sont les éléments les plus basiques de l’interface. Il s’agit, par exemple, de boutons, de champs de texte ou d'icônes.

**Exemple** : Créez un fichier `Button.tsx` dans `components/atoms`.

```typescript
// components/atoms/Button.tsx
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button onClick={onClick} className="px-4 py-2 bg-blue-500 text-white rounded">
      {label}
    </button>
  );
};

export default Button;
```

### 2. **Molecules (Molécules)**

Les **Molécules** sont des combinaisons d’atomes formant des groupes plus complexes. Elles sont encore autonomes et représentent des blocs fonctionnels de l’interface.

**Exemple** : Créez une boîte de recherche (`SearchBox.tsx`) qui combine un champ de saisie et un bouton.

```typescript
// components/molecules/SearchBox.tsx
import React, { useState } from 'react';
import Button from '../atoms/Button';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <div className="flex">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-2 py-1 mr-2"
        placeholder="Search..."
      />
      <Button label="Search" onClick={() => onSearch(query)} />
    </div>
  );
};

export default SearchBox;
```

### 3. **Organisms (Organismes)**

Les **Organismes** combinent plusieurs molécules et atomes pour créer des sections d'interface plus larges et plus fonctionnelles. Ils commencent à représenter des parties significatives de l’application.

**Exemple** : Créez une barre de navigation (`NavBar.tsx`) qui inclut plusieurs molécules.

```typescript
// components/organisms/NavBar.tsx
import React from 'react';
import SearchBox from '../molecules/SearchBox';
import Button from '../atoms/Button';

interface NavBarProps {
  onSearch: (query: string) => void;
  onLogin: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onSearch, onLogin }) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-2xl">MyApp</div>
      <SearchBox onSearch={onSearch} />
      <Button label="Login" onClick={onLogin} />
    </nav>
  );
};

export default NavBar;
```

### 4. **Templates (Modèles)**

Les **Templates** organisent des organismes et des molécules en structures de pages. Ils définissent la mise en page sans utiliser de données réelles, laissant les détails spécifiques aux pages.

**Exemple** : Créez un template `MainLayout.tsx` qui comprend une barre de navigation et un espace pour le contenu principal.

```typescript
// components/templates/MainLayout.tsx
import React, { ReactNode } from 'react';
import NavBar from '../organisms/NavBar';

interface MainLayoutProps {
  children: ReactNode;
  onSearch: (query: string) => void;
  onLogin: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, onSearch, onLogin }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar onSearch={onSearch} onLogin={onLogin} />
      <main className="flex-grow p-4">{children}</main>
      <footer className="p-4 bg-gray-800 text-white text-center">
        © 2023 MyApp
      </footer>
    </div>
  );
};

export default MainLayout;
```

### 5. Pourquoi utiliser l’Atomic Design ?

- **Réutilisabilité** : Les composants sont organisés de manière modulaire et facilement réutilisables.
- **Maintenance simplifiée** : Les composants plus petits sont plus faciles à maintenir et à tester.
- **Clarté et lisibilité** : Les composants sont bien nommés et organisés, rendant le code plus facile à comprendre pour les équipes.

### Points clés pour intégrer TypeScript

- **Interfaces pour les Props** : TypeScript permet de typer les props de chaque composant, garantissant une meilleure documentation et une prévention des erreurs.
- **Environnements typés pour les composants** : Les objets React comme `React.FC`, `ReactNode`, etc., permettent de bien spécifier les types dans vos composants.

En suivant cette approche d’Atomic Design, vous pourrez construire des interfaces évolutives et maintenables, surtout pour des projets React de grande envergure.