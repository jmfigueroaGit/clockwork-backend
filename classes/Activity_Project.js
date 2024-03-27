// Importing necessary modules and functions
const knexImport = require('knex');
const knexConfig = require('../knexfile');
const environment = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[environment];

// Initializing knex with the connection configuration
const knex = knexImport(connectionConfig);

class ActivityProject {
	// Function to get all activity_projects of a project
	static async getActivityProjects(projectId) {
		try {
			// Getting all activity_projects of a project
			const activityProjects = await knex('activity_projects').where('project_id', projectId).select('*');

			// Returning the activity_projects data
			return activityProjects;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to get all projects of a activity by ID
	static async getActivityProjects(activityId) {
		try {
			// Getting all projects of a activity
			const projects = await knex('activity_projects').where('activity_id', activityId).select('*');

			// Returning the projects data
			return projects;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to get a activity_project by ID
	static async find(activity_projectId) {
		try {
			// Getting the activity_project by ID
			const activity_project = await knex('activity_projects').where('activity_project_id', activity_projectId).first();

			if (!activity_project) throw new Error('Activity Project not found');

			// Returning the activity_project data
			return activity_project;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to add a activity to a project
	static async addActivityToProject(data) {
		try {
			// Adding a activity to a project
			await knex('activity_projects').insert(data);
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to update a activity_project by ID
	static async updateActivityProject(activity_projectId, data) {
		try {
			// Updating the activity_project by ID
			await knex('activity_projects').where('activity_project_id', activity_projectId).update(data);
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to remove a activity from a project
	static async removeActivityFromProject(projectId, activityId) {
		try {
			// Removing a activity from a project
			await knex('activity_projects').where('project_id', projectId).where('activity_id', activityId).del();

			// Returning a success message
			return 'Activity removed from project successfully';
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}
}

// Exporting the ActivityProject class
module.exports = ActivityProject;
