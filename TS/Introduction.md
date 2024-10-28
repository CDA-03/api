# Introduction 

TypeScript est un sur-ensemble de JavaScript développé par Microsoft, qui ajoute une **couche de typage statique** au langage JavaScript. Conçu pour rendre le développement de projets plus **robuste** et **maintenable**, TypeScript permet aux développeurs de définir des types de données pour les variables, fonctions, objets et autres éléments du code. Cela réduit les erreurs fréquentes et facilite le travail en équipe sur des projets de grande envergure. TypeScript se compile ensuite en JavaScript, ce qui signifie qu’il peut être utilisé partout où JavaScript est pris en charge.

## Installation

[doc](./install.md)

### Pourquoi utiliser TypeScript ?

1. **Typage statique** : En définissant des types, TypeScript aide à détecter les erreurs avant l'exécution du code, améliorant ainsi la fiabilité du développement.
2. **Autocomplétion et documentation** : Les IDE (comme VS Code) peuvent fournir une meilleure autocomplétion et documentation, accélérant la productivité.
3. **Compatibilité avec JavaScript** : TypeScript est entièrement compatible avec JavaScript. Tout code JavaScript valide est aussi du TypeScript valide.
4. **Meilleure organisation et lisibilité** : Avec des concepts avancés comme les interfaces, les types génériques et les énumérations, TypeScript facilite la structuration des projets.

### Les Bases de TypeScript

#### 1. **Déclaration de types**

TypeScript permet de spécifier le type des variables, fonctions et autres éléments pour éviter les erreurs d'inférence de type :

```typescript
let name: string = "Alice";
let age: number = 30;
let isDeveloper: boolean = true;
```

#### 2. **Fonctions typées**

On peut spécifier les types des paramètres et du retour de fonction :

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

#### 3. **Interfaces et Types**

Les interfaces permettent de définir des structures d'objets pour améliorer la lisibilité et la maintenabilité :

```typescript
interface User {
  name: string;
  age: number;
  isDeveloper?: boolean; // Propriété optionnelle
}

const user: User = { name: "Alice", age: 25 };
```

#### 4. **Types génériques**

Les types génériques rendent les fonctions et les classes réutilisables avec différents types de données :

```typescript
function identity<T>(value: T): T {
  return value;
}

const result = identity<string>("Hello"); // Type string
```

#### 5. **Classes en TypeScript**

TypeScript étend la syntaxe de JavaScript pour les classes avec des fonctionnalités de typage :

```typescript
class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet(): string {
    return `Hello, my name is ${this.name}`;
  }
}
```

#### 6. **Énumérations (Enums)**

Les énumérations sont utiles pour gérer des valeurs constantes et spécifiques :

```typescript
enum Status {
  Active,
  Inactive,
  Pending,
}

const currentStatus: Status = Status.Active;
```

### Avantages et cas d'utilisation de TypeScript

TypeScript est particulièrement utile pour les applications à grande échelle où la maintenabilité et la lisibilité du code sont essentielles, par exemple :

- Applications front-end complexes avec **React** ou **Vue.js**
- Applications Node.js sur le backend
- Projets en équipes nombreuses où la documentation et les types peuvent être automatisés

TypeScript favorise une meilleure organisation du code, réduit les erreurs lors du développement, et améliore la collaboration. C’est un outil très précieux pour les développeurs souhaitant optimiser la qualité et la maintenabilité de leur code JavaScript.

### Typage personnalisé

Objectif
Comprendre comment étendre les types de Node.js pour inclure des variables d'environnement personnalisées dans un projet TypeScript.

1. Introduction
   
En Node.js, les variables d'environnement sont accessibles via l'objet process.env. Par défaut, TypeScript ne connaît pas les variables d'environnement que vous avez définies dans votre fichier .env. Pour éviter les erreurs de typage, vous pouvez déclarer ces variables dans votre code.


## Type dans TypeScript

Le type `Record` en TypeScript est un utilitaire qui permet de définir un objet dont les clés et les valeurs sont de types spécifiques. Cela facilite la création de types d'objets avec des propriétés dynamiques. Voici un aperçu détaillé de `Record`, ainsi qu'une explication du code que vous avez fourni.

### 1. Qu'est-ce que `Record` ?

`Record<K, V>` est un type générique dans TypeScript qui crée un type d'objet dont les clés sont de type `K` et les valeurs sont de type `V`. 

#### Syntaxe

```typescript
Record<K, V>
```

- `K` : Type des clés de l'objet (peut être une chaîne, un nombre ou un symbole).
- `V` : Type des valeurs de l'objet.

#### Exemple

Voici un exemple simple d'utilisation de `Record` :

```typescript
type Product = {
  id: number;
  name: string;
  category: string;
};

const productsById: Record<number, Product> = {
  1: { id: 1, name: "Apple", category: "Fruit" },
  2: { id: 2, name: "Broccoli", category: "Vegetable" },
};
```
