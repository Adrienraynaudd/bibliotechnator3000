// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://admin:admin@localhost:5432/ultimatelibrary',
    migrations: {
      directory: '../migrations',
    },
  },
};
