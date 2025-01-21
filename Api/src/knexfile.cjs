// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
<<<<<<< HEAD
    connection: 'postgres://admin:admin@localhost:5432/ultimatelibrary',
=======
    connection: process.env.DATABASE_URL,
>>>>>>> 2c16652 (knex configuration and github action)
    migrations: {
      directory: '../migrations',
    },
  },
};
