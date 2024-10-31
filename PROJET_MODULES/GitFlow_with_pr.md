# GitFlow avec PR (pull requests)

### 1. **Branches principales**
   - **`main`** : cette branche représente la version stable et déployée en production du projet. Elle doit être protégée, et uniquement mise à jour par des pull requests (PR) validées et revues.
   - **`dev`** : cette branche est destinée aux développements en cours qui doivent être intégrés. Elle représente la prochaine version du projet et sert de pré-production. Elle est régulièrement mise à jour avec les PR des branches `feature/XXX`.

### 2. **Branches de fonctionnalités**
   - **`feature/XXX`** : chaque nouvelle fonctionnalité, amélioration ou correctif mineur doit être développée dans une branche dédiée. Le nom de la branche doit être explicite, par exemple `feature/login`, `feature/checkout`, etc.

### 3. **Workflow**
   - **Création d’une branche de fonctionnalité** :
     - Depuis la branche `dev`, créez une nouvelle branche avec le nom `feature/XXX` pour chaque nouvelle fonctionnalité.
     - Exemple : `git checkout dev` puis `git checkout -b feature/login`.

   - **Développement et commits** :
     - Codez et faites des commits réguliers et explicites dans la branche `feature/XXX`.
     - Utilisez des messages de commit clairs et concis, incluant éventuellement des références aux tickets de suivi.

   - **Mise à jour depuis `dev`** :
     - Avant de soumettre une PR, assurez-vous que votre branche `feature/XXX` est à jour avec la dernière version de `dev` pour éviter les conflits.
     - Mettez à jour en exécutant : 
       ```bash
       git checkout feature/XXX
       git pull origin dev
       ```

   - **Pull Request (PR) vers `dev`** :
     - Une fois le développement de la fonctionnalité terminé, créez une PR depuis `feature/XXX` vers `dev`.
     - Assurez-vous que la PR est revue et validée par un autre membre de l'équipe avant la fusion.
     - Après validation et résolution des éventuels conflits, fusionnez la PR dans `dev`.

   - **Tests et validation en `dev`** :
     - Toute modification dans `dev` doit être testée en environnement de pré-production.
     - Une fois validée, la branche `dev` peut être intégrée dans `main` pour déploiement.

### 4. **Release vers `main`**
   - Lorsque toutes les fonctionnalités prêtes pour production sont validées dans `dev`, créez une PR pour fusionner `dev` dans `main`.
   - Effectuez une dernière série de tests avant de déployer en production.
   - Une fois validée, fusionnez la PR dans `main` et déployez.

### 5. **Règles supplémentaires**
   - **Protection des branches** : configurez des règles pour protéger les branches `main` et `dev` afin d'empêcher les pushs directs. Utilisez des PR pour les modifications.
   - **Nom des branches** : suivez la convention `feature/XXX` pour chaque branche de fonctionnalité, en remplaçant `XXX` par un nom descriptif et/ou un numéro de ticket.

Ce workflow assure une séparation claire entre le développement, la pré-production, et la production, favorisant une organisation structurée et des déploiements stables.