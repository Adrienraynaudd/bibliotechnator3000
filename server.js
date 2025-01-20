const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configuration de PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test de connexion à la base de données
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connexion réussie à PostgreSQL:', res.rows[0]);
  }
});

// Route de base
app.get('/', (req, res) => {
  res.send('Backend Node.js connecté à PostgreSQL');
});

app.listen(port, () => {
  console.log(`Backend en cours d'exécution sur http://localhost:${port}`);
});
