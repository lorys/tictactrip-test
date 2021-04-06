# Utilisation

Installation et mise en marche :
```
yarn install && yarn start
```
Tests :
```
yarn test
```

## note
Chaque endpoint attends un format `text/plain` en `utf8`.

# /api/justify
Envoyez un header `token` qui contient le token qui vous a été donné par `/api/token`.
Il vous faudra ajouter dans le `body` le texte à justifier.

# /api/token
Envoyer un corps { "email": "votreadressemail@ici.fr" } avec un header `text/plain` en `POST` à `/api/token`.