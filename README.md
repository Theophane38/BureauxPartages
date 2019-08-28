# BureauxPartages
Cette application web en React.JS a pour but de mettre en relation des personnes qui souhaitent prêter leur bureau car elles n'y sont pas présentes avec des personnes en déplacement qui cherche un bureau afin de pouvoir travailler. Cette application a été créée pour la collectivité territoriale de l'Isère.

## Présentation de l'application

Cette application a été conçue pour une collectivité territoriale, la connexion se fait donc directement par les serveurs du Département, aucun mot de passe n'est sauvegarder dans la base de donnée de cette application. Le back-end est en PHP car il s'agit du langage utilisé par la collectivité.

### Page de connexion

Capture d'écran de la page de connexion
![Capture-login](https://user-images.githubusercontent.com/32487884/63845293-136b9c00-c98a-11e9-8214-8846b0dbbf27.JPG)

### Page d'accueil
Une fois connecté, l'utilisateur se retrouve sur la page d'accueil sur laquelle il peut voir ses réservations et prêts à venir.
![Capture-AccueilPrets](https://user-images.githubusercontent.com/32487884/63845774-d3f17f80-c98a-11e9-8e36-dd73b6ce4816.JPG)

### Page de recherche de bureaux
L'utilisateur peut maintenant rechercher un bureau disponible.
![Capture-reservation](https://user-images.githubusercontent.com/32487884/63846068-5417e500-c98b-11e9-8bee-ca74bdc5ed73.JPG)

Une fois qu'il a trouvé un bureau correspondant à ses attentes il peut choisir le créneau sur lequel il souhaite le réserver.
![Capture-chooseTime](https://user-images.githubusercontent.com/32487884/63846586-66465300-c98c-11e9-8b90-1dd63965f253.JPG)


### Page d'ajout de prêt
Si l'utilisateur souhaite prêter son bureau il va tout d'abord devoir donner des informations sur son bureau.
![Capture-addInfosBureau](https://user-images.githubusercontent.com/32487884/63846268-bec92080-c98b-11e9-8f91-b5b57af3bc8c.JPG)

Il n'aura ensuite plus qu'a choisir un créneau sur lequel il souhaite prêter son bureau.
![Capture-addPret](https://user-images.githubusercontent.com/32487884/63846349-e7511a80-c98b-11e9-8a1a-88edcc948304.JPG)


### Page de modification du bureau

Un utilisateur peut à tout moment modifier les informations de sont bureau.
![Capture-EditBureau](https://user-images.githubusercontent.com/32487884/63846730-a4dc0d80-c98c-11e9-9114-acd1c35985fc.JPG)

### Page administrateur
Si l'utilisateur a été défini en tant qu'administrateur, il peut voir accès au tableau de bord afin de voir toute l'activité de l'application.
![Capture-TableauDeBord](https://user-images.githubusercontent.com/32487884/63846840-e79de580-c98c-11e9-990b-18dd4fd8a5cf.JPG)

Il pourra également voir tous les comptes qui ont été créés, ajouter des administrateur, regarder l'activité de chacun des comptes ou encore ajouter de nouveaux lieux.
![InkedCapture-Users_LI](https://user-images.githubusercontent.com/32487884/63849928-58e09700-c993-11e9-8a6f-09fe347f9a78.jpg)

### En savoir plus

Cette application a été créée dans le cadre d'une alternance entre Décembre 2017 et Août 2018. La partie backend n'est pas présente sur ce Github pour des raisons de sécurité et parce qu'il est en relation avec les serveurs de la collectivité territoriale, et donc uniquement utilisable dans ce contexte.
