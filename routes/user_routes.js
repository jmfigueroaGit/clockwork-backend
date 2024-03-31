const express = require('express');
const router = express.Router();
const { updateUser, deleteUser, getUsers, searchUsers, getUserById } = require('../controllers/user_controllers');
const { authenticate, authorize, verify } = require('../middlewares/auth_middleware');

// Route for updating user details, requires authentication
router.put('/me', authenticate, updateUser);

// Route for deleting user, requires authentication
router.delete('/me', authenticate, deleteUser);

// Route for getting all users, requires authentication and authorization
router.get('/', authenticate, verify, authorize('admin'), getUsers);

// Route for searching users, requires authentication and authorization
router.get('/search', authenticate, authorize('admin'), searchUsers);

// Route for getting user by ID, requires authentication and authorization
router.get('/:id', authenticate, authorize('admin'), getUserById);

module.exports = router;
