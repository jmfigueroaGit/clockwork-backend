const Member_Activity = require('../classes/Member_Activity');

// Function to get all member_activities
const getMember_Activities = async (req, res) => {
    try {
        // Getting all member_activities
        const member_activities = await Member_Activity.all();

        // Sending a success response with the member_activities data
        res.status(200).json({ data: member_activities });
    } catch (error) {
        // Sending an error response
        res.status(500).json({ message: error.message });
    }
};

// Function to get a member_activity by ID
const getMember_Activity = async (req, res) => {
    try {
        // Getting the member_activity ID from the request
        const member_activityId = req.params.id;

        // Getting the member_activity by ID
        const member_activity = await Member_Activity.find(member_activityId);

        // Sending a success response with the member_activity data
        res.status(200).json({ data: member_activity });
    } catch (error) {
        // Sending an error response
        res.status(500).json({ message: error.message });
    }
};

// Function to create a new member_activity
const createMember_Activity = async (req, res) => {
    try {
        // Getting the member_activity data from the request body
        const data = req.body;

        // Creating a new member_activity
        const member_activityId = await Member_Activity.create(data);

        // Sending a success response with the ID of the newly created member_activity
        res.status(201).json({ id: member_activityId });
    } catch (error) {
        // Sending an error response
        res.status(500).json({ message: error.message });
    }
};

// Function to search for member_activities
const searchMember_Activities = async (req, res) => {
    try {
        // Getting the search query from the request
        const query = req.query.q;

        // Searching for member_activities
        const member_activities = await Member_Activity.search(query);

        // Sending a success response with the member_activities data
        res.status(200).json({ data: member_activities });
    } catch (error) {
        // Sending an error response
        res.status(500).json({ message: error.message });
    }
};

// Function to update a member_activity by ID
const updateMember_Activity = async (req, res) => {
    try {
        // Getting the member_activity ID from the request
        const member_activityId = req.params.id;

        // Getting the updated data from the request body
        const data = req.body;

        // Updating the member_activity by ID
        await Member_Activity.update(member_activityId, data);

        // Sending a success response
        res.status(200).json({ message: 'Member Activity updated successfully' });
    } catch (error) {
        // Sending an error response
        res.status(500).json({ message: error.message });
    }
};

// Function to delete a member_activity by ID
const deleteMember_Activity = async (req, res) => {
    try {
        // Getting the member_activity ID from the request
        const member_activityId = req.params.id;

        // Deleting the member_activity by ID
        await Member_Activity.delete(member_activityId);

        // Sending a success response
        res.status(200).json({ message: 'Member Activity deleted successfully' });
    } catch (error) {
        // Sending an error response
        res.status(500).json({ message: error.message });
    }
};

// Function to get all members of an activity
const getActivityMembers = async (req, res) => {
    try {
        // Getting the activity ID from the request
        const activityId = req.params.id;

        // Getting all members of an activity
        const members = await Member_Activity.getActivityMembers(activityId);

        // Sending a success response with the members data
        res.status(200).json({ data: members });
    } catch (error) {
        // Sending an error response
        res.status(500).json({ message: error.message });
    }
};

// Function to get all activities of a member
const getMemberActivities = async (req, res) => {
    try {
        // Getting the member ID from the request
        const memberId = req.params.id;

        // Getting all activities of a member
        const activities = await Member_Activity.getMemberActivities(memberId);

        // Sending a success response with the activities data
        res.status(200).json({ data: activities });
    } catch (error) {
        // Sending an error response
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getMember_Activities, getMember_Activity, createMember_Activity, searchMember_Activities, updateMember_Activity, deleteMember_Activity, getActivityMembers, getMemberActivities };