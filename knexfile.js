// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require('dotenv').config();

module.exports = {
	development: {
		client: 'mysql2',
		connection: {
			host: process.env.DB_HOST_DEV,
			user: process.env.DB_USER_DEV,
			password: process.env.DB_PASS_DEV,
			database: process.env.DB_NAME_DEV,
		},
		migrations: {
			directory: './migrations',
		},
	},

	staging: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user: 'username',
			password: 'password',
		},
		pool: {
			min: 2,
			max: 10,
		},
	},

	production: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user: 'username',
			password: 'password',
		},
		pool: {
			min: 2,
			max: 10,
		},
	},
};
