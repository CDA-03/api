# Support de Cours : Les Firewalls dans Symfony

Dans ce support de cours, nous allons examiner la configuration des **firewalls** dans Symfony et comprendre comment ils gèrent l'accès et l'authentification des utilisateurs. Les firewalls jouent un rôle crucial dans la sécurité en contrôlant les accès aux différentes parties de l'application en fonction des URL et des permissions des utilisateurs.

---

## 1. Introduction aux Firewalls Symfony

Dans Symfony, les firewalls permettent :
- D'isoler certaines routes pour une authentification spécifique.
- De déterminer les méthodes d'authentification.
- D'indiquer quels fournisseurs d'utilisateurs (user providers) utiliser.
- D'offrir des options pour des sessions stateless ou lazy (paresseuses) afin d'optimiser les performances.

Les firewalls sont définis dans le fichier `config/packages/security.yaml`.

---

## 2. Configuration des Firewalls : Exemple Pratique

Analysons la configuration suivante :

```yaml
security:
    password_hashers:
        Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface: 'auto'

    providers:
        users_in_memory: { memory: null }
        api_user_provider:
            entity:
                class: App\Entity\User
                property: token_api

    firewalls:
        dev:
            pattern: ^/(_(profiler|wdt)|css|images|js)/
            security: false
        api:
            pattern: ^/api/
            provider: api_user_provider
            custom_authenticator: App\Security\APIAuthenticator
            stateless: true
            lazy: true

        main:
            lazy: true
            provider: users_in_memory
```

### Explications

1. **password_hashers** :
   - Déclare le type de hachage utilisé pour les mots de passe.
   - Ici, Symfony choisit automatiquement le meilleur hachage pour l'interface `PasswordAuthenticatedUserInterface`.

2. **providers** :
   - Les **fournisseurs d’utilisateurs** chargent les utilisateurs dans le firewall. Il peut s'agir d'utilisateurs stockés en mémoire (`users_in_memory`) ou dans une base de données (`api_user_provider`).
   - `api_user_provider` spécifie une entité `App\Entity\User` et identifie les utilisateurs par leur `token_api`.

3. **firewalls** :
   - **dev** : Firewall dédié aux routes internes de Symfony (profiler, assets CSS, JS), désactivé en environnement de développement (`security: false`).
   
   - **api** :
     - Gère les routes sous `/api/`.
     - Utilise le fournisseur `api_user_provider`.
     - L'authentification est stateless (sans session), souvent utilisée pour les API.
     - `lazy: true` permet d'initialiser l'authentification uniquement si nécessaire.

   - **main** :
     - Firewall principal pour les autres routes, utilise `users_in_memory`.
     - `lazy: true` optimise l'authentification en initialisant la session utilisateur seulement si c'est requis.

---

## 3. Authentificateur Personnalisé

La clé `custom_authenticator` sous `api` indique l'utilisation de l'authentificateur personnalisé `APIAuthenticator`, défini dans `App\Security\APIAuthenticator`. 

- Ce composant permet de gérer une authentification personnalisée (e.g., token Bearer).
- Il est idéal pour les API REST, en offrant une authentification légère et sécurisée.

---

## 4. Contrôles d'Accès

La section `access_control` permet de définir des règles d'accès selon les rôles d'utilisateur et les chemins de l'application. Exemple :

```yaml
access_control:
    - { path: ^/admin, roles: ROLE_ADMIN }
    - { path: ^/api/me, roles: ROLE_USER }
```

- **ROLE_ADMIN** : Restriction d’accès pour `/admin` aux utilisateurs ayant ce rôle.
- **ROLE_USER** : Contrôle l’accès à `/api/me` pour les utilisateurs connectés ayant ce rôle.

---

## 5. Exécution des Tests

Dans `security.when@test`, les paramètres de hachage sont ajustés pour réduire le coût de calcul pendant les tests, ce qui améliore les performances.

---

### Exemple de Méthode : `APIAuthenticator`

Dans la classe `APIAuthenticator`, on voit l'implémentation d'un authentificateur qui gère les tokens Bearer.

```php
namespace App\Security;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;

class APIAuthenticator extends AbstractAuthenticator
{
    public function supports(Request $request): ?bool
    {
        return $request->headers->has('Authorization') && str_contains($request->headers->get('Authorization'), 'Bearer');
    }

    // Autres méthodes ici...
}
```

Cet exemple permet d’authentifier les utilisateurs via un token `Bearer`.

---

## 6. Conclusion

Les firewalls dans Symfony sont essentiels pour organiser la sécurité de l’application, en définissant des contrôles spécifiques selon les routes, les rôles, et les méthodes d'authentification. Dans une API, les firewalls de type `stateless` offrent une gestion simplifiée et rapide de l'authentification par token.
