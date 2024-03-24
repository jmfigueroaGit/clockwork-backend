/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table('members', (table) => {
        table.boolean('is_verified').defaultTo(false);
        table.string('verification_token', 255).nullable();
        table.timestamp('verification_token_expires').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table('members', (table) => {
        table.dropColumn('is_verified');
        table.dropColumn('verification_token');
        table.dropColumn('verification_token_expires');
    });
};
