const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('../config/knexfile').development;
const User = require('../classes/User');

const register = async (req, res) => {
    try {
        const { username, email, role, password } = req.body;
        const user = await User.create(username, email, role, password);
        res.status(201).json({ message: 'User registered successfully', data: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const member = await knex('members').where({ username }).first();
        if (!member) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const valid = await bcrypt.compare(password, member.password);
        if (!valid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: member.id, role: member.role }, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { register, login };