/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('members', (table) => {
		table.increments('id');
		table.string('username').notNullable();
		table.string('password').notNullable();
		table.string('email').notNullable();
		table.string('role').notNullable().defaultTo('member');
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('members');
};
