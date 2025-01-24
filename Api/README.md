
Documentation API - Backend
Cette API permet de gérer des utilisateurs, des documents et des quiz. Elle inclut une authentification des utilisateurs via un JSON Web Token (JWT) et propose des opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) sur les documents et les quiz.

Authentification et Middleware
authenticateToken Middleware
Le middleware authenticateToken est utilisé pour vérifier l'authentification des utilisateurs à l'aide d'un JWT. Cela permet de restreindre l'accès aux routes nécessitant une authentification, comme celles pour mettre à jour et supprimer des utilisateurs.

Fonctionnement :
Le client envoie le JWT dans l'en-tête Authorization de la requête.
Le token doit être précédé de Bearer (par exemple : Authorization: Bearer <token>).
Le token est vérifié à l'aide de la méthode jwt.verify(). Si le token est valide, l'information de l'utilisateur est ajoutée à l'objet req.user et la requête est passée au gestionnaire suivant.
Si le token est invalide ou manquant, une erreur 400 ou 403 est renvoyée.
Routes Utilisateur
POST /register: Créer un nouvel utilisateur
Corps de la requête :
{
  "name": "Nom de l'utilisateur",
  "email": "email@example.com",
  "password": "motdepasse123"
}
Réponse (succès) :
Code HTTP : 201
Corps :

{
  "id": 1,
  "name": "Nom de l'utilisateur",
  "email": "email@example.com"
}
Réponse (erreur) :
Code HTTP : 500
Message : "Erreur: (message d'erreur détaillé)"
POST /login: Connexion d'un utilisateur
Corps de la requête :

{
  "email": "email@example.com",
  "password": "motdepasse123"
}
Réponse (succès) :
Code HTTP : 201
Corps :

{
  "token": "JWT_TOKEN_ICI"
}
Réponse (erreur) :
Code HTTP : 401
Message : "Mot de passe incorrect"
Code HTTP : 500
Message : "Une erreur est survenue"
GET /user: Récupérer tous les utilisateurs
Réponse (succès) :
Code HTTP : 200
Corps :

[
  {
    "id": 1,
    "name": "Nom de l'utilisateur",
    "email": "email@example.com"
  },
  {
    "id": 2,
    "name": "Autre utilisateur",
    "email": "autre@example.com"
  }
]
GET /user/:id: Récupérer un utilisateur par ID
Réponse (succès) :
Code HTTP : 200
Corps :

{
  "id": 1,
  "name": "Nom de l'utilisateur",
  "email": "email@example.com"
}
Réponse (erreur) :
Code HTTP : 404
Message : "Utilisateur non trouvé"
PUT /user/:id: Mettre à jour un utilisateur
Corps de la requête :

{
  "name": "Nouveau Nom",
  "email": "nouveau.email@example.com",
  "password": "nouveaumotdepasse123"
}
Réponse (succès) :
Code HTTP : 201
Corps :

{
  "id": 1,
  "name": "Nouveau Nom",
  "email": "nouveau.email@example.com"
}
Réponse (erreur) :
Code HTTP : 404
Message : "Utilisateur non trouvé"
Code HTTP : 500
Message : "Erreur: (message d'erreur détaillé)"
DELETE /user/:id: Supprimer un utilisateur
Réponse (succès) :
Code HTTP : 201
Message : "Utilisateur supprimé"
Réponse (erreur) :
Code HTTP : 404
Message : "Utilisateur non trouvé"
Routes Document
POST /document: Créer un nouveau document
Corps de la requête :

{
  "title": "Titre du document",
  "author": "Auteur du document",
  "library_id": 1,
  "category": "Catégorie du document",
  "documentFile": "<Fichier à télécharger>"
}
Réponse (succès) :
Code HTTP : 201
Corps :

{
  "id": 1,
  "title": "Titre du document",
  "author": "Auteur du document",
  "library_id": 1,
  "category": "Catégorie du document",
  "document_link": "document1.pdf"
}
GET /document: Récupérer tous les documents
Réponse (succès) :
Code HTTP : 200
Corps :

[
  {
    "id": 1,
    "title": "Titre du document",
    "author": "Auteur",
    "category": "Catégorie",
    "document_link": "document1.pdf"
  }
]
GET /document/:id: Récupérer un document par ID
Réponse (succès) :
Code HTTP : 200
Corps :

{
  "id": 1,
  "title": "Titre du document",
  "author": "Auteur",
  "category": "Catégorie",
  "document_link": "document1.pdf"
}
Réponse (erreur) :
Code HTTP : 404
Message : "Document non trouvé"
PUT /document/:id: Mettre à jour un document
Corps de la requête :

{
  "title": "Nouveau titre",
  "author": "Nouvel auteur",
  "category": "Nouvelle catégorie"
}
Réponse (succès) :
Code HTTP : 200
Corps :

{
  "id": 1,
  "title": "Nouveau titre",
  "author": "Nouvel auteur",
  "category": "Nouvelle catégorie",
  "document_link": "document1.pdf"
}
DELETE /document/:id: Supprimer un document
Réponse (succès) :
Code HTTP : 200
Message : "Document supprimé"
Routes Quiz
POST /quiz: Créer un nouveau quiz
Corps de la requête :

{
  "type": "QCM",
  "max_score": 10,
  "documentId": 1,
  "questions": [
    {
      "type": "Multiple Choice",
      "question": "Quel est le capital de la France?",
      "answers": ["Paris", "Lyon", "Marseille"],
      "good_answer": "Paris"
    }
  ]
}
Réponse (succès) :
Code HTTP : 201
Corps :

{
  "id": 1,
  "type": "QCM",
  "max_score": 10,
  "documentId": 1,
  "questions": [
    {
      "id": 1,
      "type": "Multiple Choice",
      "question": "Quel est le capital de la France?",
      "answers": ["Paris", "Lyon", "Marseille"],
      "good_answer": "Paris"
    }
  ]
}
GET /quiz: Récupérer tous les quiz
Réponse (succès) :
Code HTTP : 200
Corps :

[
  {
    "id": 1,
    "type": "QCM",
    "max_score": 10,
    "documentId": 1
  }
]
GET /quiz/:id: Récupérer un quiz par ID
Réponse (succès) :
Code HTTP : 200
Corps :

{
  "id": 1,
  "type": "QCM",
  "max_score": 10,
  "documentId": 1
}
PUT /quiz/:id: Mettre à jour un quiz
Corps de la requête :

{
  "type": "QCM",
  "max_score": 15,
  "questions": [
    {
      "type": "Multiple Choice",
      "question": "Quel est le capital de la France?",
      "answers": ["Paris", "Lyon", "Marseille"],
      "good_answer": "Paris"
    }
  ]
}
Réponse (succès) :
Code HTTP : 200
Corps :

{
  "id": 1,
  "type": "QCM",
  "max_score": 15,
  "documentId": 1,
  "questions": [
    {
      "id": 1,
      "type": "Multiple Choice",
      "question": "Quel est le capital de la France?",
      "answers": ["Paris", "Lyon", "Marseille"],
      "good_answer": "Paris"
    }
  ]
}
DELETE /quiz/:id: Supprimer un quiz
Réponse (succès) :
Code HTTP : 200
Message : "Quiz supprimé"

Conclusion
L'API permet de gérer les utilisateurs, documents et quiz de manière centralisée avec une authentification basée sur JWT. Elle suit une architecture RESTful et utilise des requêtes HTTP classiques pour effectuer des actions CRUD.
