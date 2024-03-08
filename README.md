# Memory Game

## Description du projet

Ce projet de jeu memory a été développé dans le cadre de la formation Concepteur Développeur d'Applications à l'ENI de Quimper. Il vise à offrir une expérience ludique tout en mettant en pratique des compétences avancées en développement web. Le jeu est construit avec HTML, CSS, et JavaScript, intégrant des principes de design fluide et une architecture orientée objet.

## Fonctionnalités

-   **Design personnalisé :** Utilisation de variables CSS pour les couleurs, l'espacement, les polices et leurs tailles. Adaptation fluide grâce à la fonction `clamp`.
-   **Pages du site :**
    -   **Landing Page :** Présente le jeu et ses règles.
    -   **Page d'Authentification :** Permet aux utilisateurs de se connecter ou de créer un compte pour accéder aux paramètres du jeu et enregistrer leurs préférences.
    -   **Page de Paramètres :** Permet aux utilisateurs d'enregistrer leurs préférences (thème et difficulté) et d'afficher les scores des 10 dernières parties.
    -   **Page de Jeu :** Où se déroule le jeu memory, avec gestion des tuiles et logique de jeu.
-   **Gestion des utilisateurs :** Création de compte et stockage sécurisé (avec hash SHA-256 pour les mots de passe) dans le localStorage. Vérification des doublons d'email et validation des champs en JavaScript.
-   **Architecture Orientée Objet :** Développement du jeu autour de trois classes principales :
    -   **Board :** Génère les tuiles et le plateau de jeu, gère le retournement des cartes.
    -   **GameManager :** Contrôle la logique du jeu, y compris les conditions de victoire.
    -   **Tile :** Gère les informations de chaque tuile, telles que l'URL de l'image, son identifiant, et son état (retournée ou non).

## Technologies utilisées

-   HTML
-   CSS (avec design fluide via `clamp`)
-   JavaScript (OOP, localStorage)

## Comment jouer ?

1. Accédez à la Landing Page pour découvrir les règles.
2. Créez un compte pour accéder aux paramètres du jeu où vous pourrez configurer vos préférences.
3. Dans la page de Paramètres, choisissez votre thème et niveau de difficulté, et consultez vos derniers scores.
4. Lancez le jeu depuis la Page de Jeu, retournez les tuiles et trouvez toutes les paires pour gagner.

## Installation et lancement

Aucune installation n'est nécessaire. Le jeu peut être lancé directement depuis un navigateur web en ouvrant le fichier `index.html`.

## Contribution

Ce projet étant un travail de formation, les contributions externes sont pour le moment limitées. Cependant, toute suggestion ou retour d'expérience est le bienvenu pour améliorer le projet.

---

Projet réalisé avec passion dans le cadre de ma formation à l'ENI de Quimper. Pour toute question ou suggestion, n'hésitez pas à me contacter.
