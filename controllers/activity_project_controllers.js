const ActivityProject = require('../classes/Activity_Project');

// Function to get all activities of a project
const getActivityProjects = async (req, res) => {
	try {
		// Getting all activities of a project
		const activityProjects = await ActivityProject.getActivityProjects(req.params.projectId);

		// Check if activity projects is empty
		if (activityProjects.length === 0) res.status(400).json({ message: 'No activities found for this project' });
		// Sending the activities data
		else res.status(200).json({ data: activityProjects });
	} catch (error) {
		// Sending the error message
		res.status(500).json({ message: error.message });
	}
};

// Function to get all projects of a activity by ID
const getProjectActivities = async (req, res) => {
	try {
		// Getting all projects of a activity
		const projects = await ActivityProject.getProjectActivities(req.params.activityId);
		// Check if projects is empty
		if (projects.length === 0) res.status(400).json({ message: 'No projects found for this activity' });
		// Sending the projects data
		res.status(200).json({ data: projects });
	} catch (error) {
		// Sending the error message
		res.status(500).json({ message: error.message });
	}
};

// Function to get a activity_project by ID
const getActivityProject = async (req, res) => {
	try {
		// Getting the activity_project ID from the request
		const activity_projectId = req.params.id;

		// Getting the activity_project by ID
		const activity_project = await ActivityProject.find(activity_projectId);

		// Sending the activity_project data
		res.status(200).json(activity_project);
	} catch (error) {
		// Sending the error message
		res.status(500).json({ message: error.message });
	}
};

// Function to add a activity to a project
const addActivityToProject = async (req, res) => {
	try {
		// Getting the activity data from the request body
		const data = req.body;

		// Adding a activity to a project
		await ActivityProject.addActivityToProject(data);

		// Sending a success response
		res.status(201).json({ message: 'Activity added to project successfully' });
	} catch (error) {
		// Sending the error message
		res.status(500).json({ message: error.message });
	}
};

// Function to update a activity_project by ID
const updateActivityProject = async (req, res) => {
	try {
		// Getting the activity_project ID from the request
		const activity_projectId = req.params.id;

		// Getting the activity data from the request body
		const data = req.body;

		// Updating the activity_project by ID
		await ActivityProject.updateActivityProject(activity_projectId, data);

		// Sending a success response
		res.status(200).json({ message: 'Activity project updated successfully' });
	} catch (error) {
		// Sending the error message
		res.status(500).json({ message: error.message });
	}
};

// Function to remove a activity from a project
const removeActivityFromProject = async (req, res) => {
	try {
		// Getting the project ID and activity ID from the request
		const projectId = req.params.projectId;
		const activityId = req.params.activityId;

		// Removing a activity from a project
		const message = await ActivityProject.removeActivityFromProject(projectId, activityId);

		// Sending a success response
		res.status(200).json({ message });
	} catch (error) {
		// Sending the error message
		res.status(500).json({ message: error.message });
	}
};

// Exporting the functions to use them in routes
module.exports = {
	getActivityProjects,
	getProjectActivities,
	getActivityProject,
	addActivityToProject,
	updateActivityProject,
	removeActivityFromProject,
};
