exports.up = function (knex) {
    return knex.schema.createTable('ranking', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')); // UUID primary key
      table.uuid('userId').notNullable();
      table.uuid('quizId').notNullable();
  
      table.foreign('userId').references('id').inTable('user').onDelete('CASCADE');
      table.foreign('quizId').references('id').inTable('quiz').onDelete('CASCADE');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('ranking');
  };