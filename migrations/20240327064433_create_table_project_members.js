/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('project_members', (table) => {
		table.increments('project_member_id').primary();
		table.integer('project_id').unsigned().notNullable();
		table.foreign('project_id').references('projects.project_id').onDelete('CASCADE');
		table.integer('member_id').unsigned().notNullable();
		table.foreign('member_id').references('members.id').onDelete('CASCADE');
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('project_members');
};
