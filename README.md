#**C.A faire**

#**Description:**

Nous sommes spécialisés dans la collecte et l'analyse des chiffres d'affaires des salons d'esthétique. Notre plateforme innovante permet aux propriétaires de salons de répertorier facilement leurs performances financières et de suivre l'évolution de leur chiffre d'affaires au fil du temps.

#**Dépendances :**

-"axios": "^1.7.2"

-"mysql2": "^3.11.0"

-"node": "^20.16.0"

#**Installation:**

Rendez-vous dans le dossier, ouvrez un terminal et tapez :

```
npm install
```

#**Démarrer le serveur:**

Pour démarrer le serveur taper la commande :

```
nodemon start
```

Une confirmation du démarrage devrait s'afficher dans la console .

#**End Points:**

**Dans le fichier "authentication.js" on trouve :**

**/signin**

Route de connexion.

- @param {string} req.body.email - L'email de l'utilisateur.
- @param {string} req.body.password - Le mot de passe de l'utilisateur.
- @returns {Object} La réponse JSON contenant le statut et le jeton JWT si la connexion est réussie.

**/signup**

Création d'un compte utilisateur avec encryption du mot de passe

- @param {String} req.body.enterprise -Reçois le nom de l'entreprise
- @param {String} req.body.email -Reçois l'email de l'utilisateur
- @param {String} req.body.password -Reçois le mot de passe de l'utilisateur
- @return {object} La réponse en json contenant le status de la reponse avec un message de confirmation

**Dans le fichier "user.js" on trouve** :

**/addCa**

Ajouter un chiffre d'affaire

- @param INT - Ajoute le montant du chiffre d'affaire
- @param DATE -Ajoute la date du jour lors de la transaction
- @return {object} - Un objet avec le status de la réponse avec un message de confirmation ou non

**/profile**

Récupérer le profile de l'utilisateur

- @param INT -Utilise l'id stocké dans le jeton pour récupérer les informations en bdd
- @return {object} Retourne un objet avec la status de la réponse et le profile de l'utilisateur

**/modifyUser**

Modifier les informations de l'utilisateur

- @param {string} -le nom du salon
- @param {string} - l'adresse du salon
- @param {date} -la date de création du salon
- @param {int} - le nombre d'employés du salon
- @param {string} -Le nom du gérant de l'entreprise
- @param {string} - le prénom du gérant de l'entreprise
- @param {int} -l'id de de l'utilisateur enregistré dans le token
- @returns {object} - retourne un objet contenant le status de la réponse ainsi qu'un message de confirmation

**/deleteAccount**

Supprimer son compte

- @param int- récupère l'id de l'utilisateur depuis le token
- @return {objetc} retourne un objet contenant le réponse du serveur

#**Dans le fichier "ca.js" on trouve:**

**/history**

Récupérer l'ensemble des chiffres d'affaire enregistrés

- @param INT -Récupère l'id de l'utilisateur pour la recherche en bdd
- @return {Object} - retourne un objet contenant le status de la reponse ainsi que les éléments trouvés ou non en bdd
