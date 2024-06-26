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
			// Getting all projects of a member
			const projects = await knex('project_members').where('member_id', memberId).select('*');

			// Returning the projects data
			return projects;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to get a project_member by ID
	static async find(project_memberId) {
		try {
			// Getting the project_member by ID
			const project_member = await knex('project_members').where('project_member_id', project_memberId).first();

			if (!project_member) throw new Error('Project Member not found');

			// Returning the project_member data
			return project_member;
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
	static async update(project_memberId, data) {
		try {
			// Updating the project_member
			await knex('project_members').where('project_member_id', project_memberId).update(data);

			// Returning the ID of the updated project_member
			return project_memberId;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}
}

// Exporting the ProjectMember class
module.exports = ProjectMember;
