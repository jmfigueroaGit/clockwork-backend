const Project = require('../classes/Project');
const ProjectShift = require('../classes/Project_Shift');
const ProjectMember = require('../classes/Project_Member');

// Function to get all projects
const getProjects = async (req, res) => {
	try {
		// Getting all projects
		const projects = await Project.all();

		// Sending a success response with the projects data
		res.status(200).json({ data: projects });
	} catch (error) {
		// Sending an error response
		res.status(500).json({ message: error.message });
	}
};

// Function to get a project by ID
const getProject = async (req, res) => {
	try {
		// Getting the project ID from the request
		const projectId = req.params.id;

		// Getting the project by ID
		const project = await Project.find(projectId);

		// Sending a success response with the project data
		res.status(200).json({ data: project });
	} catch (error) {
		// Sending an error response
		res.status(500).json({ message: error.message });
	}
};

// Function to search for projects
const searchProjects = async (req, res) => {
	try {
		// Getting the search query from the request
		const query = req.query.q;

		// Searching for projects
		const projects = await Project.search(query);

		// Sending a success response with the projects data
		res.status(200).json({ data: projects });
	} catch (error) {
		// Sending an error response
		res.status(500).json({ message: error.message });
	}
};

// Function to create a new project
const createProject = async (req, res) => {
	try {
		// Getting the project data from the request body
		const data = req.body;

		// Creating a new project
		const project = await Project.create(data);

		// Sending a success response with the data of the newly created project
		res.status(201).json({ data: project });
	} catch (error) {
		// Sending an error response
		res.status(500).json({ message: error.message });
	}
};

// Function to update a project
const updateProject = async (req, res) => {
	try {
		// Getting the project ID from the request
		const projectId = req.params.id;

		// Getting the project data from the request body
		const data = req.body;

		// Updating the project
		await Project.update(projectId, data);

		// Sending a success response
		res.status(200).json({ message: 'Project updated successfully' });
	} catch (error) {
		// Sending an error response
		res.status(500).json({ message: error.message });
	}
};

// Function to delete a project
const deleteProject = async (req, res) => {
	try {
		// Getting the project ID from the request
		const projectId = req.params.id;

		// Deleting the project
		await Project.delete(projectId);

		// Sending a success response
		res.status(200).json({ message: 'Project deleted successfully' });
	} catch (error) {
		// Sending an error response
		res.status(500).json({ message: error.message });
	}
};

// Function to get all projects for a current logged in user
const userProjects = async (req, res) => {
	try {
		// Getting the user ID from the request
		const userId = req.user.id;

		// Getting all projects for the user
		const projects = await ProjectMember.userProjects(userId);

		// Sending a success response with the projects data
		res.status(200).json({ data: projects });
	} catch (error) {
		// Sending an error response
		res.status(500).json({ message: error.message });
	}
};

// Function to get all project_shifts for a project
const getProjectShifts = async (req, res) => {
	try {
		// Getting the project ID from the request
		const projectId = req.params.id;

		// Getting all project_shifts for the project
		const project_shifts = await ProjectShift.all(projectId);

		// Sending a success response with the project_shifts data
		res.status(200).json({ data: project_shifts });
	} catch (error) {
		// Sending an error response
		res.status(500).json({ message: error.message });
	}
};

// Function to get a project_shift by ID for a project
const getProjectShift = async (req, res) => {
	try {
		// Getting the project ID from the request
		const projectId = req.params.id;

		// Getting the project_shift ID from the request
		const projectShiftId = req.params.shiftId;

		// Getting the project_shift by ID for the project
		const project_shift = await ProjectShift.find(projectId, projectShiftId);

		// Sending a success response with the project_shift data
		res.status(200).json({ data: project_shift });
	} catch (error) {
		// Sending an error response
		res.status(500).json({ message: error.message });
	}
};

// Function to create a new project_shift for a project
const createProjectShift = async (req, res) => {
	try {
		// Getting the project ID from the request
		const projectId = req.params.id;

		// Getting the project_shift data from the request body
		const data = req.body;

		// Creating a new project_shift for the project
		await ProjectShift.create(projectId, data);

		// Sending a success response
		res.status(201).json({ message: 'Project Shift created successfully' });
	} catch (error) {
		// Sending an error response
		res.status(500).json({ message: error.message });
	}
};

// Function to update a project_shift for a project
const updateProjectShift = async (req, res) => {
	try {
		// Getting the project ID from the request
		const projectId = req.params.id;

		// Getting the project_shift ID from the request
		const projectShiftId = req.params.shiftId;

		// Getting the project_shift data from the request body
		const data = req.body;

		// Updating the project_shift for the project
		await ProjectShift.update(projectId, projectShiftId, data);

		// Sending a success response
		res.status(200).json({ message: 'Project Shift updated successfully' });
	} catch (error) {
		// Sending an error response
		res.status(500).json({ message: error.message });
	}
};

// Function to delete a project_shift for a project
const deleteProjectShift = async (req, res) => {
	try {
		// Getting the project ID from the request
		const projectId = req.params.id;

		// Getting the project_shift ID from the request
		const projectShiftId = req.params.shiftId;

		// Deleting the project_shift for the project
		await ProjectShift.delete(projectId, projectShiftId);

		// Sending a success response
		res.status(200).json({ message: 'Project Shift deleted successfully' });
	} catch (error) {
		// Sending an error response
		res.status(500).json({ message: error.message });
	}
};

// Function to get all project_members for a project
const getProjectMembers = async (req, res) => {
	try {
		// Getting the project ID from the request
		const projectId = req.params.id;

		// Getting all project_members for the project
		const project_members = await ProjectMember.all(projectId);

		// Sending a success response with the project_members data
		res.status(200).json({ data: project_members });
	} catch (error) {
		// Sending an error response
		res.status(500).json({ message: error.message });
	}
};

// Function to get a project_member by ID for a project
const getProjectMember = async (req, res) => {
	try {
		// Getting the project_member ID from the request
		const projectMemberId = req.params.memberId;

		// Getting the project ID from the request
		const projectId = req.params.id;

		// Getting the project_member by ID for the project
		const project_member = await ProjectMember.find(projectId, projectMemberId);

		// Sending a success response with the project_member data
		res.status(200).json({ data: project_member });
	} catch (error) {
		// Sending an error response
		res.status(500).json({ message: error.message });
	}
};

// Function to add a member to a project
const addMemberToProject = async (req, res) => {
	try {
		// Getting the project_member data from the request body
		const { member_id } = req.body;
		const project_id = req.params.id;

		// Adding a member to a project
		await ProjectMember.addMemberToProject({ member_id, project_id });

		// Sending a success response
		res.status(201).json({ message: 'Member added to project successfully' });
	} catch (error) {
		// Sending an error response
		res.status(500).json({ message: error.message });
	}
};

// Function to remove a member from a project
const removeMemberFromProject = async (req, res) => {
	try {
		// Getting the project_member ID from the request
		const projectMemberId = req.params.memberId;
		const memberId = req.params.id;

		// Removing a member from a project
		await ProjectMember.removeMemberFromProject(projectMemberId, memberId);

		// Sending a success response
		res.status(200).json({ message: 'Member removed from project successfully' });
	} catch (error) {
		// Sending an error response
		res.status(500).json({ message: error.message });
	}
};

// Function to update a project_member by ID
const updateProjectMember = async (req, res) => {
	try {
		// Getting the project_member ID from the request
		const projectMemberId = req.params.memberId;

		// Getting the project ID from the request
		const projectId = req.params.id;

		// Getting the project_member data from the request body
		const data = req.body;

		// Updating the project_member
		await ProjectMember.update(projectId, projectMemberId, data);

		// Sending a success response
		res.status(200).json({ message: 'Project Member updated successfully' });
	} catch (error) {
		// Sending an error response
		res.status(500).json({ message: error.message });
	}
};

// Exporting the functions
module.exports = {
	getProjects,
	getProject,
	searchProjects,
	createProject,
	updateProject,
	deleteProject,
	userProjects,
	getProjectShifts,
	getProjectShift,
	createProjectShift,
	updateProjectShift,
	deleteProjectShift,
	getProjectMembers,
	getProjectMember,
	addMemberToProject,
	removeMemberFromProject,
	updateProjectMember,
};
