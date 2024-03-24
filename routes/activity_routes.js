const express = require('express');
const router = express.Router();
const { getActivities, getActivity, searchActivities, createActivity, updateActivity, deleteActivity } = require('../controllers/activity_controllers');
const { authenticate, verify, authorize } = require('../middlewares/auth_middleware');

// Route for getting all activities
router.get('/', authenticate, verify, getActivities);

// Route for creating a new activity
router.post('/', authenticate, verify, authorize('admin'), createActivity);

// Route for searching activities
router.get('/search', authenticate, verify, authorize('admin'), searchActivities);

// Route for getting an activity by ID
router.get('/:id', authenticate, verify, getActivity);

// Route for updating an activity by ID
router.put('/:id', authenticate, verify, authorize('admin'), updateActivity);

// Route for deleting an activity by ID
router.delete('/:id', authenticate, verify, authorize('admin'), deleteActivity);

module.exports = router;