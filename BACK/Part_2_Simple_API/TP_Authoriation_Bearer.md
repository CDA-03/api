# TP 01

### Classe `APIAuthenticator`

1. **Extraction du jeton** : Il est important de s'assurer que le jeton est bien nettoyé pour éviter les erreurs.
2. **Création d'un `SelfValidatingPassport`** : Cette classe est correcte pour valider le jeton sans ajouter de badge supplémentaire.
3. **Gestion des erreurs d'authentification** : Nous gérons une réponse JSON en cas d'échec ou de succès, ce qui est parfait pour une API REST.

Assurez-vous que votre entité `User` possède un champ `token_api` qui stocke le jeton API, car le `UserBadge` cherchera cet identifiant dans la base de données.

Voici la classe avec quelques ajustements mineurs :

```php
<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Component\Security\Core\User\UserInterface;

class APIAuthenticator extends AbstractAuthenticator
{
    public function supports(Request $request): ?bool
    {
        // Vérifier si l'en-tête Authorization est présent et contient "Bearer"
        return $request->headers->has('Authorization') && str_contains($request->headers->get('Authorization'), 'Bearer');
    }

    public function authenticate(Request $request): Passport
    {
        // Extraire le token de l'en-tête Authorization
        $apiToken = trim(str_replace('Bearer ', '', $request->headers->get('Authorization')));

        // Créer un passeport qui utilisera le champ `token_api` pour retrouver l'utilisateur
        return new SelfValidatingPassport(new UserBadge($apiToken));
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        // Récupérer l'utilisateur authentifié
        $user = $token->getUser();

        if (!$user instanceof UserInterface) {
            return new JsonResponse(['message' => 'User not found.'], Response::HTTP_UNAUTHORIZED);
        }

        // Renvoyer une réponse avec les données de l'utilisateur
        return new JsonResponse([
            'message' => 'Authentication successful.',
            'user' => [
                'roles' => $user->getRoles()
            ]
        ], Response::HTTP_OK);
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        // Gestion des erreurs d'authentification
        return new JsonResponse([
            'message' => $exception->getMessage()
        ], Response::HTTP_UNAUTHORIZED);
    }
}
```

### Configuration `security.yaml`

Assurez-vous que votre configuration de `security.yaml` correspond bien à celle-ci pour permettre l'authentification par le token. Voici comment cela pourrait être configuré :

```yaml
security:
    password_hashers:
        Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface: 'auto'

    providers:
        api_user_provider:
            entity:
                class: App\Entity\User
                property: token_api # Assurez-vous que `token_api` est bien un champ de l'entité `User`

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

    access_control:
        - { path: ^/api, roles: ROLE_USER }
```

### Test

1. **Générer un utilisateur avec un `token_api`**.
2. **Envoyer une requête avec un en-tête `Authorization: Bearer <token>`**.
3. **Vérifier les réponses de succès ou d’échec de l’authentification**.
