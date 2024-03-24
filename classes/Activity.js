// Importing necessary modules and functions
const knexImport = require('knex');
const knexConfig = require('../knexfile');
const environment = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[environment];

// Creating a new instance of the knex client
const knex = knexImport(connectionConfig);

class Activity {
    // Function to get all activities
    static async all() {
        try {
            // Getting all activities
            const activities = await knex('activity').select('*');

            // Returning the activities data
            return activities;
        } catch (error) {
            // Throwing an error if any
            throw new Error(error.message);
        }
    }

    // Function to get an activity by ID
    static async find(activityId) {
        try {
            // Getting the activity by ID
            const activity = await knex('activity').where('activity_id', activityId).first();

            // Returning the activity data
            return activity || {};
        }
        catch (error) {
            // Throwing an error if any
            throw new Error(error.message);
        }
    }

    // Function to search for activities
    static async search(query) {
        try {
            // Searching for activities
            const activities = await knex('activity').where('activity_name', 'like', `%${query}%`);

            // Returning the activities data
            return activities;
        } catch (error) {
            // Throwing an error if any
            throw new Error(error.message);
        }
    }

    // Function to create a new activity
    static async create(data) {
        try {
            // Creating a new activity
            const [activityId] = await knex('activity').insert(data);

            // Returning the ID of the newly created activity
            return activityId;
        } catch (error) {
            // Throwing an error if any
            throw new Error(error.message);
        }
    }

    // Function to update an activity by ID
    static async update(activityId, data) {
        try {
            // Updating the activity
            await knex('activity').where('activity_id', activityId).update(data);

            // Returning the ID of the updated activity
            return activityId;
        } catch (error) {
            // Throwing an error if any
            throw new Error(error.message);
        }
    }

    // Function to delete an activity by ID
    static async delete(activityId) {
        try {
            // Deleting the activity
            await knex('activity').where('activity_id', activityId).del();

            // Returning a success message
            return { message: 'Activity deleted successfully' };
        } catch (error) {
            // Throwing an error if any
            throw new Error(error.message);
        }
    }

    // Function to get all activities by category
    static async getByCategory(categoryId) {
        try {
            // Getting all activities by category
            const activities = await knex('activity').where('category_id', categoryId);

            // Returning the activities data
            return activities;
        } catch (error) {
            // Throwing an error if any
            throw new Error(error.message);
        }
    }


}