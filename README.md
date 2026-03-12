# IPSSI-API-PROJECT
## Présentation
### Objectif 
Concevoir une application web en stack MERN (MongoDB, Express, React et NodeJS) sur un thème libre. L'objectif étant de mettre en pratique les princiaples fonctionnalités vues en cours :
- création d'une API RESST avec Express et MongoDB
- mise en place d'un frontend React consommant notre API
- gestion de CRUD complet
- authentification avec persistance de session et déconnexion automatique lorsque le token expire
### Thème choisi  
Il s'agit d'un blog dédié à Apple avec une partie forum et une partie article/actualité. Il y aura un système de recherche de posts et d'utilisateurs, un système de réputation pour les utilisateurs et un système de newsletter en rapport avec les nouveaux articles publiés si nous avons le temps.
### Backend  
#### Structure
Étant donné qu'il est nécessaire d'utiliser une base de données type Document (NoSQL MongoDB). Rappelons que dans une base de données de type Document, nous trouvons :  
|Niveau|Description|Équivalent SQL|
|-----|-----|-----|
|Base de données|Conteneur principal regroupant les données d'une application|Base|
|Collection|Ensemble de documents du même type|Table|
|Document|Objet JSON flexible contenant les données|Ligne|

Dans notre cas précis, nous aurons besoin de plusieurs collections :
- Users avec réputations / paramètres
- Articles
- Log / events
- Sujet avec messages / posts

De fait, nous aurons besoin d'un CRUD global.