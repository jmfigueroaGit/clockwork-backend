// Importing necessary modules and functions
const knexImport = require('knex');
const knexConfig = require('../knexfile');
const environment = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[environment];

// Initializing knex with the connection configuration
const knex = knexImport(connectionConfig);

class ProjectShift {
	// Function to get all project_shifts for a project
	static async all(projectId) {
		try {
			// Getting all project_shifts for a project
			const project_shifts = await knex('project_shifts').where('project_id', projectId).select('*');

			// Returning the project_shifts data
			return project_shifts;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to get a project_shift by ID for a project
	static async find(projectId, projectShiftId) {
		try {
			// Getting the project_shift by ID for a project
			const project_shift = await knex('project_shifts')
				.where('project_id', projectId)
				.where('project_shift_id', projectShiftId)
				.first();

			if (!project_shift) throw new Error('Project Shift not found');

			// Returning the project_shift data
			return project_shift;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to search for project_shifts for a project
	static async search(projectId, query) {
		try {
			// Searching for project_shifts for a project
			const project_shifts = await knex('project_shifts')
				.where('project_id', projectId)
				.where('shift_name', 'like', `%${query}%`)
				.select('*');

			// Returning the project_shifts data
			return project_shifts;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to create a new project_shift for a project
	static async create(data) {
		try {
			// Creating a new project_shift for a project
			await knex('project_shifts').insert(data);
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to update a project_shift for a project
	static async update(projectId, projectShiftId, data) {
		try {
			// Updating the project_shift for a project
			await knex('project_shifts')
				.where('project_id', projectId)
				.where('project_shift_id', projectShiftId)
				.update(data);
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to delete a project_shift for a project
	static async delete(projectId, projectShiftId) {
		try {
			// Deleting the project_shift for a project
			await knex('project_shifts').where('project_id', projectId).where('project_shift_id', projectShiftId).del();
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}
}

// Exporting the Project_Shift class
module.exports = ProjectShift;
