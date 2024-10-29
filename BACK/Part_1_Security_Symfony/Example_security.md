```yaml
security:
    # Configuration des hashers de mots de passe pour les utilisateurs.
    # Utilisation de l'algorithme 'auto' qui choisit le meilleur algorithme disponible.
    password_hashers:
        Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface: 'auto'
    
    # Configuration des fournisseurs d'utilisateurs pour charger les utilisateurs.
    # Ici, on utilise une entité User qui est stockée dans la base de données.
    providers:
        api_user_provider:
            entity:
                class: App\Entity\User    # Classe de l'entité utilisateur
                property: email            # Propriété utilisée pour identifier l'utilisateur (adresse e-mail)

    # Configuration des firewalls qui définissent les règles de sécurité.
    firewalls:
        # Firewall pour l'environnement de développement.
        dev:
            pattern: ^/(_(profiler|wdt)|css|images|js)/  # Modèle pour les chemins à ignorer
            security: false                               # Désactivation de la sécurité

        # Firewall pour la connexion utilisateur.
        login:
            pattern: ^/api/login_check                  # Modèle pour les chemins de connexion
            stateless: true                             # Le firewall ne conserve pas l'état de la session
            json_login:                                 # Configuration de la connexion via JSON
                check_path: /api/login_check           # Chemin à vérifier pour la connexion
                username_path: email                    # Utilise 'email' comme nom d'utilisateur
                password_path: password                 # Chemin pour le mot de passe
                success_handler: lexik_jwt_authentication.handler.authentication_success  # Gestionnaire en cas de succès
                failure_handler: lexik_jwt_authentication.handler.authentication_failure  # Gestionnaire en cas d'échec

        # Firewall pour les routes API.
        api:
            pattern: ^/api/                             # Modèle pour les chemins API
            stateless: true                             # Le firewall ne conserve pas l'état de la session
            jwt: ~                                      # Configuration pour utiliser JWT
            provider: api_user_provider                 # Utilise le fournisseur d'utilisateurs défini plus haut

    # Contrôle d'accès pour les sections de l'application.
    # Note: Seul le premier contrôle d'accès correspondant sera utilisé.
    access_control:
        - { path: ^/api/login_check, roles: IS_AUTHENTICATED_ANONYMOUSLY }  # Autorise l'accès anonyme à la route de connexion
        - { path: ^/api, roles: IS_AUTHENTICATED_FULLY }                    # Nécessite une authentification complète pour accéder à toutes les autres routes API

when@test:
    security:
        # Configuration spécifique aux tests pour réduire la charge de travail lors de la création de hachages.
        password_hashers:
            Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface:
                algorithm: auto                      # Algorithme pour le hachage des mots de passe
                cost: 4                             # Valeur minimale pour bcrypt
                time_cost: 3                        # Valeur minimale pour argon
                memory_cost: 10                     # Valeur minimale pour argon
```

### Explications des Sections

- **password_hashers** : Définit les méthodes de hachage utilisées pour les mots de passe des utilisateurs, ce qui est essentiel pour la sécurité.
  
- **providers** : Indique comment charger les utilisateurs, ici en utilisant une entité de la base de données.

- **firewalls** : Définissent les règles de sécurité pour différentes parties de l'application. 
  - `dev` : Désactive la sécurité pour les ressources de développement.
  - `login` : Gère la connexion avec des requêtes JSON.
  - `api` : Protège les routes API avec JWT.

- **access_control** : Gère l'accès aux différentes routes de l'application en fonction des rôles de l'utilisateur.

- **when@test** : Configuration spécifique pour les tests, permettant une exécution plus rapide en réduisant la charge des opérations de hachage. 

## Précision sur le provider

Oui, c'est exactement ça ! La ligne `provider: api_user_provider` dans la configuration du firewall pour les routes API indique à Symfony d'utiliser le fournisseur d'utilisateurs (`api_user_provider`) pour récupérer les informations de l'utilisateur authentifié.

### Détails sur le fonctionnement

1. **Fournisseur d'utilisateurs (`provider`)** : 
   - Le fournisseur que vous avez défini (`api_user_provider`) est configuré pour utiliser une entité `User`. Cela signifie que lorsque vous essayez de récupérer les informations d'un utilisateur via `$this->getUser()` dans un contrôleur, Symfony interrogera la base de données pour obtenir l'utilisateur correspondant à l'email utilisé lors de l'authentification.
  
2. **Authentification avec JWT** :
   - Lorsque l'utilisateur se connecte avec ses identifiants via le point de terminaison `/api/login_check`, un JWT est émis. Ce token est ensuite utilisé pour authentifier les requêtes suivantes.
   - Le middleware de sécurité de Symfony vérifie ce token à chaque requête vers les routes API protégées. Si le token est valide, Symfony utilise le fournisseur d'utilisateurs pour charger les données de l'utilisateur en fonction des informations contenues dans le token (typiquement l'ID de l'utilisateur ou l'email).

3. **Récupération des informations utilisateur** :
   - Dans votre contrôleur, lorsque vous appelez `$this->getUser()`, Symfony vous renvoie l'objet `User` correspondant à l'utilisateur actuellement authentifié. Vous pouvez alors accéder aux propriétés de cet objet pour obtenir des informations sur l'utilisateur, comme son email, son nom, etc.

### Exemple de code dans un contrôleur

Voici un exemple de code d'un contrôleur pour illustrer comment récupérer les informations de l'utilisateur :

```php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    #[Route('/api/me', name: 'api_me')]
    #[IsGranted("ROLE_USER")]
    public function me(): JsonResponse
    {
        $user = $this->getUser(); // Récupère l'utilisateur authentifié type UserInterface

        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], 404);
        }
        
        return new JsonResponse([
            'roles' => $user->getRoles(),
            'email' =>  $user->getUserIdentifier()
        ]);
    }
}
```

Dans cet exemple, la méthode `me()` renvoie les informations de l'utilisateur connecté, à condition que le JWT soit valide et que l'utilisateur soit authentifié. Si l'utilisateur n'est pas trouvé, une erreur est renvoyée. 
