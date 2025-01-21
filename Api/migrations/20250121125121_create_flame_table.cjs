exports.up = function (knex) {
    return knex.schema.createTable('flame', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')); // UUID primary key
      table.date('date').notNullable();
      table.integer('numberOfFlame').notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('flame');
  };