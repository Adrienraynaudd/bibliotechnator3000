exports.up = function (knex) {
    return knex.schema.createTable('question', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')); // UUID primary key
      table.string('type', 255).notNullable();
      table.text('question').notNullable();
      table.text('answers').notNullable(); // Stored as JSON or text
      table.integer('goodAnswer').notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('question');
  };