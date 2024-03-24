/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('activity', function (table) {
        table.increments('activity_id').primary();
        table.string('activity_name', 300).nullable();
        table.time('activity_limit').nullable();
        table.time('activity_alert').nullable();
        table.enum('activity_rule', ['auto', 'wf_approval']).notNullable().defaultTo('auto');
        table.integer('activity_wfID').nullable();
        table.enum('activity_status', ['ACTIVE', 'ARCHIVED', 'INACTIVE']).notNullable().defaultTo('ACTIVE');
        table.integer('activity_type').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('activity');
};
