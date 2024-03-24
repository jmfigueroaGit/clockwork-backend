const express = require('express');
const router = express.Router();
const { getMember_Activities, getMember_Activity, createMember_Activity, searchMember_Activities, updateMember_Activity, deleteMember_Activity, getActivityMembers, getMemberActivities } = require('../controllers/member_activity_controllers');
const { authenticate, authorize, verify } = require('../middlewares/auth_middleware');

// Route for getting all member_activities
router.get('/', authenticate, verify, getMember_Activities);

// Route for creating a new member_activity
router.post('/', authenticate, verify, authorize('admin'), createMember_Activity);

// Route for searching member_activities
router.get('/search', authenticate, verify, authorize('admin'), searchMember_Activities);

// Route for getting a member_activity by ID
router.get('/:id', authenticate, verify, getMember_Activity);

// Route for updating a member_activity by ID
router.put('/:id', authenticate, verify, authorize('admin'), updateMember_Activity);

// Route for deleting a member_activity by ID
router.delete('/:id', authenticate, verify, authorize('admin'), deleteMember_Activity);

// Route for getting all members of an activity
router.get('/activity/:id', authenticate, verify, getActivityMembers);

// Route for getting all activities of a member
router.get('/member/:id', authenticate, verify, getMemberActivities);

module.exports = router;