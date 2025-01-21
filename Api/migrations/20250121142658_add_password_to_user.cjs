exports.up = function (knex) {
    return knex.schema.alterTable('user', function (table) {
        table.text('password').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('user', function (table) {
        table.dropColumn('password'); // Drop the column
    });
};