const Activity = require('../classes/Activity');

// Function to get all activities
const getActivities = async (req, res) => {
    try {
        // Getting all activities
        const activities = await Activity.all();

        // Sending a success response with the activities data
        res.status(200).json({ data: activities });
    } catch (error) {
        // Sending an error response
        res.status(500).json({ message: error.message });
    }
};

// Function to get an activity by ID
const getActivity = async (req, res) => {
    try {
        // Getting the activity ID from the request
        const activityId = req.params.id;

        // Getting the activity by ID
        const activity = await Activity.find(activityId);

        // Sending a success response with the activity data
        res.status(200).json({ data: activity });
    } catch (error) {
        // Sending an error response
        res.status(500).json({ message: error.message });
    }
};

// Function to search for activities
const searchActivities = async (req, res) => {
    try {
        // Getting the search query from the request
        const query = req.query.q;

        // Searching for activities
        const activities = await Activity.search(query);

        // Sending a success response with the activities data
        res.status(200).json({ data: activities });
    } catch (error) {
        // Sending an error response
        res.status(500).json({ message: error.message });
    }
};

// Function to create a new activity
const createActivity = async (req, res) => {
    try {
        // Getting the activity data from the request body
        const data = req.body;

        // Creating a new activity
        const activityId = await Activity.create(data);

        // Sending a success response with the ID of the newly created activity
        res.status(201).json({ data: activityId });
    } catch (error) {
        // Sending an error response
        res.status(500).json({ message: error.message });
    }
};

// Function to update an activity by ID
const updateActivity = async (req, res) => {
    try {
        // Getting the activity ID from the request parameters
        const activityId = req.params.id;

        // Getting the updated activity data from the request body
        const data = req.body;

        // Updating the activity
        await Activity.update(activityId, data);

        // Sending a success response
        res.status(200).json({ message: "Activity updated successfully" });
    } catch (error) {
        // Sending an error response
        res.status(500).json({ message: error.message });
    }
};

// Function to delete an activity by ID
const deleteActivity = async (req, res) => {
    try {
        // Getting the activity ID from the request parameters
        const activityId = req.params.id;

        // Deleting the activity
        await Activity.delete(activityId);

        // Sending a success response
        res.status(200).json({ message: "Activity deleted successfully" });
    } catch (error) {
        // Sending an error response
        res.status(500).json({ message: error.message });
    }
};

// Exporting the functions
module.exports = {
    getActivities,
    getActivity,
    searchActivities,
    createActivity,
    updateActivity,
    deleteActivity
};