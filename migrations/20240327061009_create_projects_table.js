/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('projects', (table) => {
		table.increments('project_id').primary();
		table.string('project_name').notNullable();
		table.string('project_description');
		table.integer('project_manager').notNullable();
		table.integer('project_lead');
		table.integer('project_director').notNullable();
		table.integer('project_status').notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('projects');
};
