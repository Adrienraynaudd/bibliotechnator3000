exports.up = function (knex) {
    return knex.schema.createTable('quiz', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')); // UUID primary key
      table.string('type', 255).notNullable();
      table.integer('maxScore').notNullable();
      table.uuid('documentId').notNullable();
      table.uuid('questionId').notNullable();
  
      table.foreign('documentId').references('id').inTable('document').onDelete('CASCADE');
      table.foreign('questionId').references('id').inTable('question').onDelete('CASCADE');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('quiz');
  };