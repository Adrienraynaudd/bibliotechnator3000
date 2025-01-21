exports.up = function (knex) {
    return knex.schema.alterTable('user', function (table) {
        table.uuid('favorites').nullable().alter(); // Rendre la colonne nullable
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('user', function (table) {
        table.uuid('favorites').notNullable().alter(); // Rendre la colonne non nullable
    });
};
