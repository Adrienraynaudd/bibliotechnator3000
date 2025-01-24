# Documentation API - Backend

Cette API permet de gérer des **utilisateurs**, des **documents** et des **quiz**. Elle inclut une authentification des utilisateurs via un **JSON Web Token (JWT)** et propose des opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) sur les entités.

---

## **Authentification et Middleware**

### Middleware : `authenticateToken`

Le middleware `authenticateToken` est utilisé pour vérifier l'authentification des utilisateurs à l'aide d'un JWT. Il restreint l'accès aux routes nécessitant une authentification.

**Fonctionnement :**
1. Le client envoie le JWT dans l'en-tête `Authorization` de la requête (exemple : `Authorization: Bearer <TOKEN>`).
2. Le token est vérifié avec la méthode `jwt.verify()`.
3. Si valide :
   - Les informations utilisateur sont ajoutées à `req.user`.
   - La requête est transmise au gestionnaire suivant.
4. Si invalide ou manquant :
   - Une erreur `400` ou `403` est renvoyée.

---

## **Routes**

### **1. Utilisateur**

#### POST `/register`
Créer un nouvel utilisateur.

- **Corps de la requête :**
  ```json
  {
    "name": "Nom de l'utilisateur",
    "email": "email@example.com",
    "password": "motdepasse123"
  }
  ```
- **Réponse (succès) :**
  - Code HTTP : `201`
  - Corps :
    ```json
    {
      "id": 1,
      "name": "Nom de l'utilisateur",
      "email": "email@example.com"
    }
    ```

#### POST `/login`
Connexion d'un utilisateur.

- **Corps de la requête :**
  ```json
  {
    "email": "email@example.com",
    "password": "motdepasse123"
  }
  ```
- **Réponse (succès) :**
  - Code HTTP : `201`
  - Corps :
    ```json
    {
      "token": "JWT_TOKEN_ICI"
    }
    ```

#### GET `/user`
Récupérer tous les utilisateurs.

- **Réponse (succès) :**
  - Code HTTP : `200`
  - Corps :
    ```json
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
    ```

#### GET `/user/:id`
Récupérer un utilisateur par ID.

- **Réponse (succès) :**
  ```json
  {
    "id": 1,
    "name": "Nom de l'utilisateur",
    "email": "email@example.com"
  }
  ```

#### PUT `/user/:id`
Mettre à jour un utilisateur.

- **Corps de la requête :**
  ```json
  {
    "name": "Nouveau Nom",
    "email": "nouveau.email@example.com",
    "password": "nouveaumotdepasse123"
  }
  ```

#### DELETE `/user/:id`
Supprimer un utilisateur.

- **Réponse (succès) :**
  - Code HTTP : `200`
  - Message : `"Utilisateur supprimé"`

---

### **2. Document**

#### POST `/document`
Créer un nouveau document.

- **Corps de la requête :**
  ```json
  {
    "title": "Titre du document",
    "author": "Auteur du document",
    "library_id": 1,
    "category": "Catégorie du document",
    "documentFile": "<Fichier à télécharger>"
  }
  ```

- **Réponse (succès) :**
  ```json
  {
    "id": 1,
    "title": "Titre du document",
    "author": "Auteur",
    "library_id": 1,
    "category": "Catégorie",
    "document_link": "document1.pdf"
  }
  ```

#### GET `/document`
Récupérer tous les documents.

#### GET `/document/:id`
Récupérer un document par ID.

#### PUT `/document/:id`
Mettre à jour un document.

#### DELETE `/document/:id`
Supprimer un document.

---

### **3. Quiz**

#### POST `/quiz`
Créer un nouveau quiz.

- **Corps de la requête :**
  ```json
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
  ```

#### GET `/quiz`
Récupérer tous les quiz.

#### GET `/quiz/:id`
Récupérer un quiz par ID.

#### PUT `/quiz/:id`
Mettre à jour un quiz.

#### DELETE `/quiz/:id`
Supprimer un quiz.

---

## **Installation et Lancement**

1. Clonez le projet :
   ```bash
   git clone <URL_DU_REPO>
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Configurez les variables d'environnement (`.env`) :
   - Exemple :
     ```
    DATABASE_URL=<URL>
    PORT=<PORT>
    SECRET_KEY=<SECRET_KEY>
     ```
4. Lancez le serveur :
   ```bash
   npm run dev
   ```

---

### **Technologies utilisées**
- **Node.js** avec **Express**
- **JWT** pour l'authentification
- **Base de données** relationnelle (ex : MySQL, PostgreSQL)

---