/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.table('members', (table) => {
		table.string('manager_id').nullable();
		table.string('director_id').nullable();
		table.string('first_name').nullable();
		table.string('last_name').nullable();
		table.boolean('member_status').defaultTo(true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.table('members', (table) => {
		table.dropColumn('manager_id');
		table.dropColumn('director_id');
		table.dropColumn('first_name');
		table.dropColumn('last_name');
		table.dropColumn('member_status');
	});
};
