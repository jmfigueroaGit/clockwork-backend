// Importing necessary modules and functions
const knexImport = require('knex');
const knexConfig = require('../knexfile');
const environment = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[environment];
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Auth = require('./Auth');

// Initializing knex with the connection configuration
const knex = knexImport(connectionConfig);

// User class definition
class User {
	// Method to find a user by id
	static async find(id) {
		// Query the database for the user with the given id
		try {
			const member = await knex('members')
				.where({
					id,
				})
				.first();
			if (!member) {
				throw new Error('Member not found');
			}
			return {
				id: member.id,
				username: member.username,
				email: member.email,
				role: member.role,
				is_verified: member.is_verified,
			};
		} catch (error) {
			throw new Error(error.message);
		}
	}

	// Method to update a user's details
	static async update(id, { username, email, role, password }) {
		// Check if the user exists and update the user's details
		try {
			const member = await knex('members')
				.where({
					id,
				})
				.first();
			if (!member) {
				throw new Error('Member not found');
			}

			if (username) {
				const usernameExist = await Auth.usernameExists(username);
				if (usernameExist) {
					throw new Error('Username already exists');
				}
			}

			if (email) {
				const emailExist = await Auth.emailExists(email);
				if (emailExist) {
					throw new Error('Email already exists');
				}
			}

			if (password) {
				const salt = await bcrypt.genSalt(10);
				const hash = await bcrypt.hash(password, salt);
				await knex('members')
					.where({
						id,
					})
					.update({
						password: hash,
					});
			}

			await knex('members')
				.where({
					id,
				})
				.update({
					username,
					email,
					role,
				});

			return {
				id,
				username,
				email,
				role,
			};
		} catch (error) {
			throw new Error(error.message);
		}
	}

	// Method to delete a user
	static async delete(id) {
		// Delete the user from the database
		try {
			await knex('members')
				.where({
					id,
				})
				.del();
			return {
				message: 'Member deleted',
			};
		} catch (error) {
			throw new Error(error.message);
		}
	}

	// Method to get all users
	static async all() {
		// Query the database for all users
		try {
			const members = await knex('members').select('id', 'username', 'email', 'role');
			return members;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	// Method to get the count of users
	static async count() {
		// Count the number of users in the database
		try {
			const [{ count }] = await knex('members').count('id');
			return count;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	// Method to get a paginated list of users
	static async paginate(page, limit) {
		// Query the database for users with pagination
		try {
			const members = await knex('members')
				.select('id', 'username', 'email', 'role')
				.limit(limit)
				.offset((page - 1) * limit);
			return members;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	// Method to search for users by username
	static async search(query) {
		// Query the database for users with the given username
		try {
			const members = await knex('members')
				.where('username', 'like', `%${query}%`)
				.select('id', 'username', 'email', 'role');
			return members;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	// Method to get all distinct roles
	static async roles() {
		// Query the database for all distinct roles
		try {
			const roles = await knex('members').distinct('role').select('role');
			return roles;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	// Method to find users by role
	static async findByRole(role) {
		// Query the database for users with the given role
		try {
			const members = await knex('members')
				.where({
					role,
				})
				.select('id', 'username', 'email', 'role');
			return members;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	// Method to find a user by email
	static async findByEmail(email) {
		// Query the database for the user with the given email
		try {
			const member = await knex('members')
				.where({
					email,
				})
				.first();
			if (!member) {
				throw new Error('Member not found');
			}
			return {
				id: member.id,
				username: member.username,
				email: member.email,
				role: member.role,
			};
		} catch (error) {
			throw new Error(error.message);
		}
	}

	// Method to find a user by username
	static async findByUsername(username) {
		// Query the database for the user with the given username
		try {
			const member = await knex('members')
				.where({
					username,
				})
				.first();
			if (!member) {
				throw new Error('Member not found');
			}
			return {
				id: member.id,
				username: member.username,
				email: member.email,
				role: member.role,
			};
		} catch (error) {
			throw new Error(error.message);
		}
	}

	// Method to find a user by username and email
	static async findByCredentials(username, email) {
		// Query the database for the user with the given username and email
		try {
			const member = await knex('members')
				.where({
					username,
					email,
				})
				.first();
			if (!member) {
				throw new Error('Member not found');
			}
			return {
				id: member.id,
				username: member.username,
				email: member.email,
				role: member.role,
			};
		} catch (error) {
			throw new Error(error.message);
		}
	}

	// Method to find a user by username or email
	static async findByUsernameOrEmail(username, email) {
		// Query the database for the user with the given username or email
		try {
			const member = await knex('members')
				.where({
					username,
				})
				.orWhere({
					email,
				})
				.first();
			if (!member) {
				throw new Error('Member not found');
			}
			return {
				id: member.id,
				username: member.username,
				email: member.email,
				role: member.role,
			};
		} catch (error) {
			throw new Error(error.message);
		}
	}

	// Method to find a user by username, email, or id
	static async findByUsernameOrEmailOrId(username, email, id) {
		// Query the database for the user with the given username, email, or id
		try {
			const member = await knex('members')
				.where({
					username,
				})
				.orWhere({
					email,
				})
				.orWhere({
					id,
				})
				.first();
			if (!member) {
				throw new Error('Member not found');
			}
			return {
				id: member.id,
				username: member.username,
				email: member.email,
				role: member.role,
			};
		} catch (error) {
			throw new Error(error.message);
		}
	}

	// Method to find a user by role and username
	static async findByRoleAndUsername(role, username) {
		// Query the database for the user with the given role and username
		try {
			const member = await knex('members')
				.where({
					role,
					username,
				})
				.first();
			if (!member) {
				throw new Error('Member not found');
			}
			return {
				id: member.id,
				username: member.username,
				email: member.email,
				role: member.role,
			};
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

// Exporting the User class
module.exports = User;
