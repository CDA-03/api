# Back API

## Installation 

```bash
git clone git@github.com:CDA-03/api-modules.git
```
Lancez dans le dossier db docker, ce conteneur possède deux images Postgres et Adminer ( gestionnaire de SGBD).

```bash
docker-compose up -d
```

Dans le dossier app du projet tapez les lignes de commande suivantes, pensez à regarder le fichier .env dans leque se trouve la configuration pour se connecter à la base de données, les clés secrètes et les règles CORS, par exemple.

```bash
###> symfony/framework-bundle ###
APP_ENV=dev
APP_SECRET=1417810ded6e7b5685fc2d137689dfa8
###< symfony/framework-bundle ###

###> doctrine/doctrine-bundle ###
DATABASE_URL="postgresql://admin:password@localhost:5433/education-api?serverVersion=16&charset=utf8"
###< doctrine/doctrine-bundle ###

###> lexik/jwt-authentication-bundle ###
JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
JWT_PASSPHRASE=705fad7d58ebb31eb8b29189aff3ce904b280d11967e61d5b58428b070322548
###< lexik/jwt-authentication-bundle ###

###> nelmio/cors-bundle ###
CORS_ALLOW_ORIGIN='^https?://(localhost|127\.0\.0\.1)(:[0-9]+)?$'
###< nelmio/cors-bundle ###
```

- Dans le terminale pour installer le projet tapez les lignes de code suivante

```bash
composer install
php bin/console doctrine:database:create 
php bin/console doctrine:migrations:migrate  
php bin/console doctrine:fixtures:load

# génération des clés publiques / privés
php bin/console lexik:jwt:generate-keypair --overwrite
```

## Présentation

Cette application backend, développée avec Symfony, est une API sécurisée qui gère l’authentification et les accès via JWT. Elle permet d’assurer la sécurité des endpoints tout en offrant des opérations CRUD pour les entités utilisateurs et modules. Optimisée pour des échanges rapides et sécurisés, elle garantit une communication fiable entre le frontend et le backend.

- Pour tester l'API on utilisera Insomia ou Postma 

[introduction Insomia](./insomia.md)

Avec Insomnia, par exemple, tester et déboguer l’API devient plus rapide et intuitif, ce qui aide à garantir le bon fonctionnement de l'authentification JWT dans le projet.

## Extrait de code de l'application Back 

Cette application backend, développée avec Symfony, est une API sécurisée qui gère l’authentification et les accès via JWT. Elle permet d’assurer la sécurité des endpoints tout en offrant des opérations CRUD pour les entités utilisateurs et modules. Optimisée pour des échanges rapides et sécurisés, elle garantit une communication fiable entre le frontend et le backend.

### Arborescence du dossier `src/`

```txt
src
├── Controller
│   └── API
│       ├── ModuleController.php       # Gère les endpoints pour les modules
│       └── UserController.php         # Gère les endpoints pour les utilisateurs
├── DataFixtures
│   └── AppFixtures.php                # Données initiales pour les tests
├── Entity
│   ├── Module.php                     # Entité Module (structure de la table Module)
│   └── User.php                       # Entité User (structure de la table User)
├── Kernel.php                         # Initialisation et configuration globale de l'app
├── Repository
│   ├── ModuleRepository.php           # Requêtes spécifiques pour les modules
│   └── UserRepository.php             # Requêtes spécifiques pour les utilisateurs
└── Security
    └── APIAuthenticator.php           # Gestion de l'authentification personnalisée pour JWT
```

### Structure `src/`

Chaque dossier joue un rôle précis dans la construction et la sécurisation de l'API.

- **Controller/API**
  - **ModuleController.php** et **UserController.php** : Contiennent les endpoints de l'API pour les ressources `Module` et `User`. Ces contrôleurs gèrent la logique métier pour chaque type de ressource, en traitant les requêtes et en répondant en JSON (requête en base de données avec le repository Doctrine)
  
- **DataFixtures**
  - **AppFixtures.php** : Permet de préremplir la base de données avec des données d'exemple (ou "fixtures") pour les tests ou le développement.

- **Entity**
  - **Module.php** et **User.php** : Représentent les entités de l'application (correspondent aux tables de la base de données). Les entités définissent la structure et les relations de chaque ressource, comme les champs de chaque table et leurs contraintes.
  - Dans le projet nous avons des utilisateurs qui suivent des cours et des cours qui sont associés à des utilisateurs.
  - Voyez le [ER](ER.md)

- **Kernel.php** : Gère le cycle de vie de l’application Symfony en initialisant les composants, gérant la configuration, et en orchestrant les requêtes et réponses.

- **Repository**
  - **ModuleRepository.php** et **UserRepository.php** : Contiennent des méthodes pour effectuer des requêtes spécifiques sur les entités `Module` et `User`. Les repositories permettent d'interagir avec la base de données en effectuant des opérations de lecture et d'écriture sur les entités.

### Configuration `security.yaml`
Le fichier `security.yaml` définit la sécurité de l’API en configurant les fournisseurs d'utilisateurs, les firewalls et les contrôles d’accès.

- **password_hashers** : Définit le hachage des mots de passe pour la sécurité, avec un algorithme automatique recommandé.

- **providers**
  - **api_user_provider** : Charge les utilisateurs depuis la base de données via l'entité `User` en utilisant l'email pour l'authentification, ce qui est essentiel pour identifier l'utilisateur de manière unique.

- **firewalls**
  - **dev** : Exclut les chemins des outils de développement de la sécurité.
  - **login** : Gère la connexion JWT :
    - `check_path` et `json_login` configurent l'authentification via un endpoint JSON sur `/api/login_check` avec `email` comme identifiant et `password` pour l’authentification.
    - `success_handler` et `failure_handler` utilisent Lexik JWT pour générer ou refuser le token JWT.
  - **api** : Assure la sécurité des endpoints `/api/` :
    - `stateless: true` signifie que ce firewall ne garde aucune session serveur (sécurité stateless).
    - `jwt: ~` active la vérification JWT pour l'authentification.
    - `provider` pointe vers `api_user_provider` pour charger les utilisateurs de manière sécurisée.

- **access_control**
  - **Chemins d'accès** : Définit les règles de contrôle d'accès pour sécuriser les endpoints.
    - `/api/login_check` est accessible anonymement (pour permettre la connexion).
    - Tous les autres chemins sous `/api` requièrent l'authentification complète (`IS_AUTHENTICATED_FULLY`), garantissant que seuls les utilisateurs connectés peuvent y accéder.

- **when@test** : Cette section configure des paramètres de sécurité spécifiques aux tests pour optimiser les ressources lors des tests en réduisant le coût du hachage des mots de passe.

Voyez le fichier de sécurité : [security.yaml](../Part_1_Security_Symfony/Example_security.md)


## Sécuriser les échanges avec l'API avec un token JWT

```mermaid
sequenceDiagram
    participant Client
    participant Server as Serveur API (Symfony)
    participant JWT as JWT Token

    Client->>Server: 1. Requête de connexion (email, password)
    Server->>JWT: 2. Validation des informations d'identification
    JWT-->>Server: 3. Génération d'un token JWT
    Server-->>Client: 4. Réponse avec le token JWT

    Client->>Server: 5. Requête d'API sécurisée avec JWT
    Server->>JWT: 6. Vérification et validation du token JWT
    JWT-->>Server: 7. Validation réussie (ou échec si token non valide)
    Server-->>Client: 8. Réponse sécurisée de l'API (données requises)
```

### Explications des étapes :

1. **Requête de connexion** : Le client envoie ses informations d'identification.
2. **Validation des informations** : Le serveur vérifie les informations et demande la génération du token.
3. **Génération de JWT** : Si les informations sont valides, un token JWT est généré.
4. **Réponse avec JWT** : Le serveur retourne le token JWT au client.
5. **Requête sécurisée avec JWT** : Le client utilise le token pour accéder aux endpoints protégés.
6. **Validation du token** : Le serveur vérifie la validité du token JWT.
7. **Validation réussie** : Le token est validé (ou rejeté si non valide).
8. **Réponse sécurisée** : Le serveur retourne la réponse au client.

## Comment sont utilisés clés privé et publique dans JWT

Dans l'authentification JWT avec des clés privée et publique, les rôles de chaque clé sont essentiels pour garantir à la fois la sécurité des données et l'authentification :

### 1. Clé Privée (Private Key)
La **clé privée** est utilisée pour **signer le token JWT**. Cette clé doit être conservée secrète et n'est accessible que par le serveur (généralement stockée en toute sécurité sur le backend). Voici son rôle dans le processus JWT :

- **Signer le token JWT** : Le serveur utilise la clé privée pour signer le token, garantissant qu'il est authentique et n’a pas été altéré.
- **Assurer l'intégrité** : Puisque la clé privée est uniquement accessible au serveur, un token signé prouve que seul le serveur a pu le générer.

### 2. Clé Publique (Public Key)
La **clé publique** est utilisée pour **vérifier la signature du token JWT**. Elle est accessible à tout système qui doit valider un token, y compris le serveur lui-même, ou même des services externes autorisés. Son rôle est de :

- **Valider l'authenticité** : La clé publique permet de vérifier que le token a été signé avec la clé privée correspondante.
- **Vérifier l'intégrité sans exposer la clé privée** : Grâce à la clé publique, un tiers peut vérifier le token JWT sans avoir besoin de la clé privée, ce qui garantit que la clé privée reste protégée.

### Exemple du Processus avec JWT

1. **Création et Signature** : Lorsqu'un utilisateur se connecte, le serveur génère un JWT et le signe avec la clé privée.
2. **Envoi au Client** : Le JWT signé est renvoyé au client.
3. **Validation** : Lorsqu'une requête protégée est envoyée, le serveur utilise la clé publique pour vérifier que le JWT n'a pas été modifié et qu'il a bien été signé par la clé privée.

Ce système de clés permet donc une **authentification sécurisée** en assurant que seules les requêtes avec des tokens validés (signés par la clé privée) sont acceptées.

```mermaid
sequenceDiagram
    participant Client
    participant Server as Serveur API (Symfony)
    participant PrivateKey as Clé Privée
    participant PublicKey as Clé Publique

    Client->>Server: 1. Requête de connexion (email, password)
    Server->>PrivateKey: 2. Génération et signature du JWT
    PrivateKey-->>Server: JWT signé
    Server-->>Client: 3. Réponse avec le JWT signé

    Client->>Server: 4. Requête sécurisée avec JWT
    Server->>PublicKey: 5. Validation du JWT avec la clé publique
    PublicKey-->>Server: 6. Validation réussie (ou rejet si invalide)
    Server-->>Client: 7. Réponse sécurisée
```

### Explications des étapes :

1. **Requête de connexion** : Le client envoie ses informations d'identification.
2. **Signature du JWT** : Le serveur génère et signe le JWT avec la clé privée.
3. **Réponse avec JWT signé** : Le serveur retourne le JWT signé au client.
4. **Requête sécurisée** : Le client envoie une requête protégée avec le JWT.
5. **Validation avec clé publique** : Le serveur utilise la clé publique pour vérifier le JWT.
6. **Validation réussie ou rejetée** : La clé publique confirme ou rejette l'authenticité du JWT.
7. **Réponse sécurisée** : Le serveur retourne la réponse au client si le JWT est valide. 

Ce processus assure la sécurité en utilisant la signature de la clé privée et la vérification de la clé publique.

## Le CORS

⚠️ Avec le CORS en place, votre frontend pourra interagir en toute sécurité avec l'API backend pour récupérer les cours et autres données.

Le **CORS (Cross-Origin Resource Sharing)** est un mécanisme de sécurité qui permet à votre application frontend (hébergée sur un domaine ou port spécifique) d'accéder aux ressources de votre backend, même si ce dernier est hébergé sur un autre domaine ou port. Par défaut, les navigateurs bloquent les requêtes inter-origines (cross-origin) pour des raisons de sécurité. Le CORS permet de lever cette restriction **en définissant les origines autorisées sur le serveur backend**.

### Exemple d'utilisation dans votre cas

Si votre frontend est sur `http://localhost:5173` et que votre backend est sur `http://localhost:8000`, le serveur backend doit être configuré pour autoriser les requêtes provenant de `http://localhost:5173`. Cela se fait en définissant un en-tête HTTP **`Access-Control-Allow-Origin`** qui spécifie les domaines autorisés à accéder aux ressources.

### Mise en place du CORS dans Symfony

1. **Configurer les autorisations** : Dans votre configuration Symfony (`config/packages/nelmio_cors.yaml`), vous pouvez définir les domaines autorisés ainsi que les types de requêtes acceptés (GET, POST, etc.).

   ```yaml
   # config/packages/nelmio_cors.yaml
   nelmio_cors:
       defaults:
           allow_origin: ['http://localhost:5173'] # votre frontend
           allow_methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
           allow_headers: ['Content-Type', 'Authorization']
           max_age: 3600
       paths:
           '^/api/': # Applique le CORS aux routes commençant par /api/
               allow_origin: ['http://localhost:5173']
   ```

2. **Activer le CORS dans le code** : Assurez-vous que le bundle **NelmioCorsBundle** est installé et configuré dans Symfony pour gérer ces en-têtes. Ce bundle gère automatiquement les en-têtes CORS pour les routes spécifiées.

3. **Vérifier les réponses** : Une fois configuré, le backend répondra aux requêtes avec des en-têtes CORS permettant au frontend d'accéder aux données, notamment pour les informations sur les cours dans votre cas.
