const express = require('express');
const router = express.Router();
const { authenticate, verify, authorize } = require('../middlewares/auth_middleware');
const {
	getActivityProjects,
	getProjectActivities,
	getActivityProject,
	addActivityToProject,
	updateActivityProject,
	removeActivityFromProject,
} = require('../controllers/activity_project_controllers');

// Middleware for routes requiring authentication and authorization
router.use(authenticate, verify);

// Route for getting all activities of a project
router.get('/projects/:projectId', getActivityProjects);

// Route for getting all projects of a activity
router.get('/activities/:activityId', getProjectActivities);

// Route for getting a activity_project by ID
router.get('/:id', getActivityProject);

// Route for adding a activity to a project
router.post('/', authorize('admin'), addActivityToProject);

// Route for updating a activity_project by ID
router.put('/:id', authorize('admin'), updateActivityProject);

// Route for removing a activity from a project
router.delete('/:projectId/:activityId', authorize('admin'), removeActivityFromProject);

module.exports = router;
