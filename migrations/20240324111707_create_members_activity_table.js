/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('members_activity', function (table) {
        table.increments('members_activity_id').primary();
        table.datetime('members_activity_start').defaultTo(knex.fn.now());
        table.datetime('members_activity_end').defaultTo(null);
        table.string('members_activity_excess', 45).nullable();
        table.enum('members_activity_status', ['ARCHIVED', 'REQUEST', 'ACTIVE', 'APPROVED', 'READ']).defaultTo('ACTIVE');
        table.text('notes').nullable();
        table.integer('member_ID').nullable();
        table.integer('activity_ID').nullable();
        table.datetime('members_activity_date_created').defaultTo(knex.fn.now()).notNullable();
        table.string('members_activity_approved_by', 45).nullable();
        table.integer('members_activity_requestt_id').nullable();
        table.integer('project_id').nullable();
        table.string('members_activity_alert', 45).defaultTo('0');
        table.boolean('isPriority').defaultTo(false);
        table.integer('members_activity_request_id').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('members_activity');
};
