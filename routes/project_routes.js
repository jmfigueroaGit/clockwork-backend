const express = require('express');
const router = express.Router();
const { authenticate, verify, authorize } = require('../middlewares/auth_middleware');
const {
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
} = require('../controllers/project_controllers');

// Middleware for routes requiring authentication and authorization
router.use(authenticate, verify);

// Route for searching projects
router.get('/search', searchProjects); // Search for projects

// Routes for Projects
router.get('/', getProjects); // Get all projects
router.post('/', createProject); // Create a new project

router
	.route('/:id')
	.get(getProject) // Get a specific project by ID
	.put(updateProject) // Update a specific project by ID
	.delete(deleteProject); // Delete a specific project by ID

router.get('/user/me', userProjects); // Get projects for a specific user

// Routes for Project Shifts
router.get('/:id/shifts', getProjectShifts); // Get all shifts for a specific project
router.get('/:id/shifts/:shiftId', getProjectShift); // Get a specific shift for a specific project
router.post('/:id/shifts', createProjectShift); // Create a new shift for a specific project
router.put('/:id/shifts/:shiftId', updateProjectShift); // Update a specific shift for a specific project
router.delete('/:id/shifts/:shiftId', deleteProjectShift); // Delete a specific shift for a specific project

// Routes for Project Members
router.get('/:id/members', getProjectMembers); // Get all members for a specific project
router.get('/:id/members/:memberId', getProjectMember); // Get a specific member for a specific project
router.post('/:id/members', addMemberToProject); // Add a member to a project
router.delete('/:id/members/:memberId', removeMemberFromProject); // Remove a member from a project
router.put('/:id/members/:memberId', updateProjectMember); // Update a member's information

module.exports = router;
