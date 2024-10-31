**Introduction à Insomnia pour les API sécurisées JWT**

Dans le développement d'une API sécurisée avec Symfony et JWT, **Insomnia** joue un rôle crucial pour tester, simuler et déboguer les requêtes. C'est un outil de test d'API REST qui permet d'envoyer facilement des requêtes HTTP et de visualiser les réponses du serveur, en vérifiant l'authentification, les autorisations, et les différents endpoints de l'API.

### Pourquoi utiliser Insomnia dans ce projet ?

1. **Tester l’authentification JWT** : Insomnia permet d'envoyer des requêtes de connexion avec des identifiants utilisateurs pour recevoir un token JWT. Ce token peut ensuite être réutilisé dans les requêtes ultérieures.
2. **Automatiser les headers d’authentification** : Une fois obtenu, le JWT peut être ajouté automatiquement aux headers des requêtes pour simuler des appels authentifiés, ce qui est essentiel pour tester les endpoints sécurisés.
3. **Simuler des scénarios de test** : Insomnia permet de créer des environnements de test (développement, production, etc.), de passer des données spécifiques, et de reproduire des scénarios utilisateur sans interagir avec une interface.

### Utilisation de base dans le projet

1. **Connexion et réception du JWT** : Envoyez une requête `POST` au chemin `/api/login_check` avec les identifiants. La réponse contient le JWT, qu’on peut copier et ajouter aux requêtes suivantes.
2. **Envoi de requêtes sécurisées** : Ajoutez le JWT au header d'autorisation (`Authorization: Bearer <token>`) pour tester les endpoints sécurisés de l'API.
3. **Organisation des requêtes** : Insomnia permet de regrouper les différentes requêtes (connexion, récupération des données, création de ressources, etc.) pour une gestion simplifiée des tests. 
