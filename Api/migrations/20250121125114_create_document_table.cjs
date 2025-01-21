exports.up = function (knex) {
    return knex.schema.createTable('document', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')); // UUID primary key
      table.string('title', 255).notNullable();
      table.string('author', 255).notNullable();
      table.uuid('libraryId').notNullable();
      table.text('category').notNullable();
      table.string('documentLink', 255).notNullable();
    //   table.uuid('createdBy').notNullable();
  
      table.foreign('libraryId').references('id').inTable('library').onDelete('CASCADE');
    //   table.foreign('createdBy').references('id').inTable('user').onDelete('CASCADE');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('document');
  };