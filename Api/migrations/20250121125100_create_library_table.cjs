exports.up = function (knex) {
    return knex.schema.createTable('library', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')); // UUID primary key
      table.string('name', 255).notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('library');
  };
  