const User = require("../classes/User");

// Function to get a user
const getUser = async (req, res) => {
    try {
        // Getting the user from the request
        const user = req.user;

        // Sending a success response with the user data
        res.status(200).json({ data: user });
    } catch (error) {
        // Sending an error response
        res.status(500).json({ message: error.message });
    }
};

// Function to update a user
const updateUser = async (req, res) => {
    try {
        // Getting the user from the request
        const user = req.user;

        // Getting the updated user data from the request body
        const updatedUser = req.body;

        // Updating the user data
        const result = await User.update(user.id, updatedUser);

        // Sending a success response with the updated user data
        res.status(200).json({ data: result });
    } catch (error) {
        // Sending an error response
        res.status(500).json({ message: error.message });
    }
};

// Function to delete a user
const deleteUser = async (req, res) => {
    try {
        // Getting the user from the request
        const user = req.user;

        // Deleting the user
        await User.delete(user.id);

        // Sending a success response
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        // Sending an error response
        res.status(500).json({ message: error.message });
    }
};

// Function to get all users
const getUsers = async (req, res) => {
    try {
        // Getting all users
        const users = await User.all();

        // Sending a success response with the users data
        res.status(200).json({ data: users });
    } catch (error) {
        // Sending an error response
        res.status(500).json({ message: error.message });
    }
};

// Function to search for users
const searchUsers = async (req, res) => {
    try {
        // Getting the search query from the request
        const query = req.query.q;

        // Searching for users
        const users = await User.search(query);

        // Sending a success response with the users data
        res.status(200).json({ data: users });
    } catch (error) {
        // Sending an error response
        res.status(500).json({ message: error.message });
    }
};

// Function to get a user by ID
const getUserById = async (req, res) => {
    try {
        // Getting the user ID from the request parameters
        const userId = req.params.id;

        // Getting the user by ID
        const user = await User.find(userId);

        // Sending a success response with the user data
        res.status(200).json({ data: user });
    } catch (error) {
        // Sending an error response
        res.status(500).json({ message: error.message });
    }
};

// Exporting the functions
module.exports = {
    getUser,
    updateUser,
    deleteUser,
    getUsers,
    searchUsers,
    getUserById,
};