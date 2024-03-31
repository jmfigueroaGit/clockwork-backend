// Importing necessary modules and functions
const knexImport = require('knex');
const knexConfig = require('../knexfile');
const environment = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[environment];

// Initializing knex with the connection configuration
const knex = knexImport(connectionConfig);

class ProjectMember {
	// Function to get all project_members of a project
	static async all(projectId) {
		try {
			// Getting all project_members of a project
			const projectMembers = await knex('project_members').where('project_id', projectId).select('*');

			// Returning the project_members data
			return projectMembers;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to get all projects of a member by ID
	static async userProjects(memberId) {
		try {
			// Getting all projects of a member and nest the project data
			const projects = await knex('project_members')
				.where('member_id', memberId)
				.join('projects', 'projects.project_id', 'project_members.project_id')
				.select('projects.*', 'project_members.*');

			// Returning the projects data
			return projects;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to get a project_member by ID for a project
	static async find(projectId, projectMemberId) {
		try {
			// Getting a project_member by ID for a project
			const projectMember = await knex('project_members')
				.where('project_id', projectId)
				.where('project_member_id', projectMemberId)
				.select('*')
				.first();

			// Returning the project_member data
			return projectMember;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to add a member to a project
	static async addMemberToProject(data) {
		try {
			// Adding a member to a project
			await knex('project_members').insert(data);

			// Returning the project_members data
			return data;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to remove a member from a project
	static async removeMemberFromProject(projectId, memberId) {
		try {
			// Removing a member from a project
			await knex('project_members').where('project_id', projectId).where('member_id', memberId).del();

			// Returning a success message
			return 'Member removed from project successfully';
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to update a project_member by ID
	static async update(projectId, project_memberId, data) {
		try {
			// Updating a project_member by ID
			await knex('project_members')
				.where('project_id', projectId)
				.where('project_member_id', project_memberId)
				.update(data);

			// Returning the updated project_member data
			return data;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}
}

// Exporting the ProjectMember class
module.exports = ProjectMember;
