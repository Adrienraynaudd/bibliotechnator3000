exports.up = function (knex) {
    return knex.schema.createTable('user', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')); // UUID primary key
      table.string('name', 255).notNullable();
      table.string('email', 255).notNullable();
      table.uuid('flameId').notNullable();
      table.uuid('favorites').nullable();
  
      table.foreign('flameId').references('id').inTable('flame').onDelete('CASCADE');
      table.foreign('favorites').references('id').inTable('document').onDelete('CASCADE');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('user');
  };