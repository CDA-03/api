# GitFlow simple

### 1. **Branches principales**
   - **`main`** : représente la version stable et prête pour la production du projet. Cette branche ne doit être mise à jour que lorsque le code est bien testé et validé.
   - **`dev`** : cette branche sert de branche de développement centralisée. Les fonctionnalités en cours sont fusionnées dans cette branche une fois complétées et testées localement.

### 2. **Branches de fonctionnalités**
   - **`feature/XXX`** : chaque nouvelle fonctionnalité ou amélioration est développée dans une branche spécifique. Le nom doit être clair et informatif, par exemple `feature/login`, `feature/checkout`, etc.

### 3. **Workflow simplifié**
   - **1. Créer une branche de fonctionnalité** :
     - Depuis la branche `dev`, créez une nouvelle branche pour chaque fonctionnalité.
     - Exemple : 
       ```bash
       git checkout dev
       git checkout -b feature/nom_fonctionnalite
       ```

   - **2. Développer et commiter** :
     - Développez votre code dans la branche `feature/nom_fonctionnalite`.
     - Faites des commits réguliers avec des messages clairs décrivant les changements effectués :
       ```bash
       git add .
       git commit -m "Message décrivant la modification"
       ```

   - **3. Mettre à jour `dev` et fusionner la fonctionnalité** :
     - Une fois la fonctionnalité terminée et testée, retournez dans la branche `dev` :
       ```bash
       git checkout dev
       ```
     - Mettez à jour la branche `dev` si d'autres fonctionnalités y ont été ajoutées entre-temps :
       ```bash
       git pull origin dev
       ```
     - Fusionnez votre branche de fonctionnalité dans `dev` :
       ```bash
       git merge feature/nom_fonctionnalite
       ```

   - **4. Tester en `dev`** :
     - Une fois fusionnée, testez votre fonctionnalité dans la branche `dev` pour vous assurer que tout fonctionne comme prévu.

   - **5. Fusionner `dev` dans `main`** :
     - Une fois que plusieurs fonctionnalités sont prêtes, et que `dev` est stable, vous pouvez les passer en production.
     - Depuis `main`, fusionnez `dev` :
       ```bash
       git checkout main
       git merge dev
       ```
     - **Note** : Assurez-vous de bien tester votre code avant de fusionner dans `main`, car `main` doit toujours rester stable.

### 4. **Règles supplémentaires**
   - **Nom des branches** : utilisez le format `feature/nom_fonctionnalite` pour garder une bonne organisation des fonctionnalités.
   - **Pas de push direct vers `main`** : effectuez toujours vos développements dans des branches `feature` et fusionnez d’abord dans `dev`, puis dans `main`.
