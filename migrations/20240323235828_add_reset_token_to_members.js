/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table('members', (table) => {
        table.string('reset_token', 255).nullable();
        table.timestamp('reset_token_expires').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table('members', (table) => {
        table.dropColumn('reset_token');
        table.dropColumn('reset_token_expires');
    });
};
