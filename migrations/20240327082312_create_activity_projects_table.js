/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('activity_projects', (table) => {
		table.increments('activity_project_id').primary();
		table.integer('activity_id').unsigned().notNullable();
		table.integer('project_id').unsigned().notNullable();
		table.foreign('activity_id').references('activities.activity_id');
		table.foreign('project_id').references('projects.project_id');
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('activity_projects');
};
