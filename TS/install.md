
### 1. Initialiser le projet
Dans un dossier vide, commencez par initialiser un projet Node.js :

```bash
npm init -y
```

### 2. Installer les dépendances
Installez les dépendances nécessaires, notamment `typescript`, `ts-node` pour exécuter du TypeScript directement dans Node.js, et `nodemon` pour le rechargement automatique.

```bash
npm install typescript ts-node nodemon --save-dev
npm install concurrently --save-dev
```

### 3. Configurer TypeScript
Générez un fichier de configuration TypeScript `tsconfig.json` avec la commande suivante :

```bash
npx tsc --init
```

Cela va créer un fichier `tsconfig.json` avec des options de configuration. Pour un projet basique, vous pouvez laisser les options par défaut, mais vous pourriez modifier les paramètres suivants pour un projet Node.js :

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "esModuleInterop": true
  }
}
```

### 4. Configurer Nodemon pour TypeScript
Créez un fichier `nodemon.json` à la racine du projet pour configurer Nodemon afin qu’il utilise `ts-node` pour les fichiers TypeScript. Ajoutez-y la configuration suivante :

```json
{
  "watch": ["src"],
  "ext": "ts",
  "ignore": ["dist"],
  "exec": "concurrently \"npx tsc --watch\" \"node -r ts-node/register --env-file=.env src/index.ts\""
}
```

Ce fichier indique à Nodemon de surveiller les changements dans le dossier `src`, d’exécuter les fichiers `.ts` et d’ignorer le dossier `dist`.

### 5. Ajouter un script dans `package.json`
Ajoutez un script dans `package.json` pour exécuter Nodemon avec votre fichier TypeScript d'entrée :

```json
"scripts": {
  "dev": "nodemon"
}
```

### 6. Créer la structure du projet
Créez un dossier `src` avec un fichier d'entrée `index.ts` :

```
src/
└── index.ts
```

Dans `src/index.ts`, ajoutez un code simple pour tester la configuration :

```typescript
console.log("Hello, TypeScript with Nodemon!");
```

### 7. Démarrer le serveur
Lancez le serveur avec la commande suivante :

```bash
npm run dev
```

À chaque modification de fichier TypeScript dans le dossier `src`, Nodemon redémarrera automatiquement l'application.