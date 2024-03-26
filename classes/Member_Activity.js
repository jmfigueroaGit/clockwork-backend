// Importing necessary modules and functions
const knexImport = require('knex');
const knexConfig = require('../knexfile');
const environment = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[environment];

// Initializing knex with the connection configuration
const knex = knexImport(connectionConfig);

class Member_Activity {
	// Function to get all member_activities
	static async all() {
		try {
			// Getting all member_activities
			const member_activities = await knex('member_activities').select('*');

			// Returning the member_activities data
			return member_activities;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to get a member_activity by ID
	static async find(member_activityId) {
		try {
			// Getting the member_activity by ID
			const member_activity = await knex('member_activities').where('member_activity_id', member_activityId).first();

			if (!member_activity) throw new Error('Member Activity not found');

			// Returning the member_activity data
			return member_activity;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to search for member_activities
	static async search(query) {
		try {
			// Searching for member_activities
			const member_activities = await knex('member_activities')
				.where('activity_name', 'like', `%${query}%`)
				.select('*');

			// Returning the member_activities data
			return member_activities;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to create a new member_activity
	static async create(data) {
		try {
			// Creating a new member_activity
			const [member_activityId] = await knex('member_activities').insert(data);

			// Returning the ID of the newly created member_activity
			return member_activityId;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to update a member_activity by ID
	static async update(member_activityId, data) {
		try {
			// Updating the member_activity
			await knex('member_activities').where('member_activity_id', member_activityId).update(data);

			// Returning the ID of the updated member_activity
			return member_activityId;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to delete a member_activity by ID
	static async delete(member_activityId) {
		try {
			// Deleting the member_activity
			await knex('member_activities').where('member_activity_id', member_activityId).del();

			// Returning the ID of the deleted member_activity
			return member_activityId;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to get all members of an activity
	static async getActivityMembers(activityId) {
		try {
			// Getting all members of an activity
			const members = await knex('member_activities')
				.join('members', 'member_activities.member_id', 'members.id')
				.where('member_activities.activity_id', activityId)
				.select('members.*');

			// Returning the members data
			return members;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}

	// Function to get all activities of a member
	static async getMemberActivities(memberId) {
		try {
			// Getting all activities of a member
			const activities = await knex('member_activities')
				.join('activities', 'member_activities.activity_id', 'activities.activity_id')
				.where('member_activities.member_id', memberId)
				.select('activities.*');

			// Returning the activities data
			return activities;
		} catch (error) {
			// Throwing an error if any
			throw new Error(error.message);
		}
	}
}

module.exports = Member_Activity;
