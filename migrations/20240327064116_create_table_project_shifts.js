/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('project_shifts', (table) => {
		table.increments('project_shift_id').primary();
		table.integer('project_id').unsigned().notNullable();
		table.foreign('project_id').references('projects.project_id').onDelete('CASCADE');
		table.time('start_time').notNullable();
		table.time('end_time').notNullable();
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('project_shifts');
};
