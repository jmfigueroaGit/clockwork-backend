// Importing necessary modules and functions
const knexImport = require('knex');
const knexConfig = require('../knexfile');
const environment = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[environment];

// Initializing knex with the connection configuration
const knex = knexImport(connectionConfig);

class Project {
	// Function to get all projects
	static async all() {
		try {
			// Getting all projects
			const projects = await knex('projects').select('*');

			// Returning the projects data
			return projects;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to get a project by ID
	static async find(projectId) {
		try {
			// Getting the project by ID
			const project = await knex('projects').where('project_id', projectId).first();

			if (!project) throw new Error('Project not found');

			// Returning the project data
			return project;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to search for projects
	static async search(query) {
		try {
			// Searching for projects
			const projects = await knex('projects').where('project_name', 'like', `%${query}%`).select('*');

			// Returning the projects data
			return projects;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to create a new project
	static async create(data) {
		try {
			// Creating a new project
			await knex('projects').insert(data);

			// Returning the project data
			return data;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to update a project
	static async update(projectId, data) {
		try {
			// Updating the project
			await knex('projects').where('project_id', projectId).update(data);

			// Returning the project data
			return data;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to delete a project
	static async delete(projectId) {
		try {
			// Deleting the project
			await knex('projects').where('project_id', projectId).del();

			// Returning the project ID
			return projectId;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to get all projects for a user
	static async userProjects(userId) {
		try {
			// Getting all projects for the user
			const projects = await knex('projects')
				.where('project_manager', userId)
				.orWhere('project_lead', userId)
				.orWhere('project_director', userId)
				.select('*');

			// Returning the projects data
			return projects;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}
}

// Exporting the Project class
module.exports = Project;
