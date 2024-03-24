// Importing necessary modules and functions
const knexImport = require('knex');
const knexConfig = require('../knexfile');
const environment = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[environment];
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Initializing knex with the connection configuration
const knex = knexImport(connectionConfig);

// User class definition
class User {

    // Method to create a new user
    static async create(username, email, role, password) {
        // Check if username or email already exists, if so throw an error
        // Hash the password and insert the new user into the database
        try {
            const usernameExist = await this.usernameExists(username);

            if (usernameExist) {
                throw new Error('Username already exists');
            }

            const emailExist = await this.emailExists(email);

            if (emailExist) {
                throw new Error('Email already exists');
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            await knex('members').insert({ username, password: hash, email, role, });
            return { username, email, role };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to authenticate a user
    static async authenticate(username, password) {
        // Check if the user exists and if the password is correct
        try {
            const member = await knex('members').where({ username }).first();
            if (!member) {
                throw new Error('Invalid credentials');
            }
            const valid = await bcrypt.compare(password, member.password);
            if (!valid) {
                throw new Error('Invalid credentials');
            }

            return { id: member.id, role: member.role };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to find a user by id
    static async find(id) {
        // Query the database for the user with the given id
        try {
            const member = await knex('members').where({ id }).first();
            if (!member) {
                throw new Error('Member not found');
            }
            return { id: member.id, username: member.username, email: member.email, role: member.role, is_verified: member.is_verified };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to update a user's details
    static async update(id, { username, email, role, password }) {
        // Check if the user exists and update the user's details
        try {
            const member = await knex('members').where({ id }).first();
            if (!member) {
                throw new Error('Member not found');
            }

            if (username) {
                const usernameExist = await this.usernameExists(username);
                if (usernameExist) {
                    throw new Error('Username already exists');
                }
            }

            if (email) {
                const emailExist = await this.emailExists(email);
                if (emailExist) {
                    throw new Error('Email already exists');
                }
            }

            if (password) {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);
                await knex('members').where({ id }).update({ password: hash });
            }

            await knex('members').where({ id }).update({ username, email, role });

            return { id, username, email, role };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to delete a user
    static async delete(id) {
        // Delete the user from the database
        try {
            await knex('members').where({ id }).del();
            return { message: 'Member deleted' };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to get all users
    static async all() {
        // Query the database for all users
        try {
            const members = await knex('members').select('id', 'username', 'email', 'role');
            return members;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to get the count of users
    static async count() {
        // Count the number of users in the database
        try {
            const [{ count }] = await knex('members').count('id');
            return count;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to get a paginated list of users
    static async paginate(page, limit) {
        // Query the database for users with pagination
        try {
            const members = await knex('members').select('id', 'username', 'email', 'role').limit(limit).offset((page - 1) * limit);
            return members;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to search for users by username
    static async search(query) {
        // Query the database for users with the given username
        try {
            const members = await knex('members').where('username', 'like', `%${query}%`).select('id', 'username', 'email', 'role');
            return members;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to get all distinct roles
    static async roles() {
        // Query the database for all distinct roles
        try {
            const roles = await knex('members').distinct('role').select('role');
            return roles;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to find users by role
    static async findByRole(role) {
        // Query the database for users with the given role
        try {
            const members = await knex('members').where({ role }).select('id', 'username', 'email', 'role');
            return members;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to find a user by email
    static async findByEmail(email) {
        // Query the database for the user with the given email
        try {
            const member = await knex('members').where({ email }).first();
            if (!member) {
                throw new Error('Member not found');
            }
            return { id: member.id, username: member.username, email: member.email, role: member.role };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to find a user by username
    static async findByUsername(username) {
        // Query the database for the user with the given username
        try {
            const member = await knex('members').where({ username }).first();
            if (!member) {
                throw new Error('Member not found');
            }
            return { id: member.id, username: member.username, email: member.email, role: member.role };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to find a user by username and email
    static async findByCredentials(username, email) {
        // Query the database for the user with the given username and email
        try {
            const member = await knex('members').where({ username, email }).first();
            if (!member) {
                throw new Error('Member not found');
            }
            return { id: member.id, username: member.username, email: member.email, role: member.role };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to find a user by username or email
    static async findByUsernameOrEmail(username, email) {
        // Query the database for the user with the given username or email
        try {
            const member = await knex('members').where({ username }).orWhere({ email }).first();
            if (!member) {
                throw new Error('Member not found');
            }
            return { id: member.id, username: member.username, email: member.email, role: member.role };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to find a user by username, email, or id
    static async findByUsernameOrEmailOrId(username, email, id) {
        // Query the database for the user with the given username, email, or id
        try {
            const member = await knex('members').where({ username }).orWhere({ email }).orWhere({ id }).first();
            if (!member) {
                throw new Error('Member not found');
            }
            return { id: member.id, username: member.username, email: member.email, role: member.role };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to find a user by role and username
    static async findByRoleAndUsername(role, username) {
        // Query the database for the user with the given role and username
        try {
            const member = await knex('members').where({ role, username }).first();
            if (!member) {
                throw new Error('Member not found');
            }
            return { id: member.id, username: member.username, email: member.email, role: member.role };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to check if a username exists
    static async usernameExists(username) {
        // Query the database for the user with the given username
        try {
            const member = await knex('members').where({ username }).first();
            if (!member) {
                return false;
            }
            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to check if an email exists
    static async emailExists(email) {
        // Query the database for the user with the given email
        try {
            const member = await knex('members').where({ email }).first();
            if (!member) {
                return false;
            }
            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to generate a reset token for a user
    static async resetToken(email) {
        // Generate a reset token and set its expiration time
        try {
            const member = await knex('members').where({ email }).first();
            if (!member) {
                throw new Error('Member not found');
            }

            const resetToken = crypto.randomBytes(20).toString('hex');

            // Generate hash of the reset token
            const hash = crypto.createHash('sha256').update(resetToken).digest('hex');

            // Calculate reset token expiration time (1 hour from now)
            const resetTokenExpires = new Date(Date.now() + 3600000).toISOString().slice(0, 19).replace('T', ' ');

            await knex('members').where({ email }).update({ reset_token: hash, reset_token_expires: resetTokenExpires });

            return resetToken;

        } catch (error) {

            console.log(error);
            throw new Error(error.message);
        }
    }

    // Method to check if a reset token is valid
    static async verifyResetToken(resetToken) {
        // Check if the reset token exists and is not expired
        try {
            const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
            const member = await knex('members').where({ reset_token: resetTokenHash }).first();
            if (!member) {
                throw new Error('Member not found');
            }

            if (member.reset_token_expires < new Date().toISOString().slice(0, 19).replace('T', ' ')) {
                throw new Error('Reset token expired');
            }

            return member;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to reset a user's password
    static async resetPassword(resetToken, password) {
        try {
            // Verify the reset token and get the member
            const member = await this.verifyResetToken(resetToken);

            // Generate a salt and hash the new password
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            // Update the member's password and clear the reset token and expiration
            const updatedMember = await knex('members')
                .where({ reset_token: member.reset_token })
                .update({
                    password: hash,
                    reset_token: null,
                    reset_token_expires: null
                });

            // Return the updated member
            return { message: 'Password reset successfully' };

        } catch (error) {
            // If an error occurs, throw an error with the message
            throw new Error(error.message);
        }
    }

    // Method to verify the account using the sending email verification
    static async verifyAccount(email) {
        // Generate a verification token and set its expiration time
        try {
            const member = await knex('members').where({ email }).first();
            if (!member) {
                throw new Error('Member not found');
            }

            const verificationToken = crypto.randomBytes(20).toString('hex');

            // Generate hash of the verification token
            const hash = crypto.createHash('sha256').update(verificationToken).digest('hex');

            // Calculate verification token expiration time (1 hour from now)
            const verificationTokenExpires = new Date(Date.now() + 3600000).toISOString().slice(0, 19).replace('T', ' ');

            await knex('members').where({ email }).update({ verification_token: hash, verification_token_expires: verificationTokenExpires });

            return verificationToken;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to check if a verification token is valid
    static async verifyVerificationToken(verificationToken) {
        // Check if the verification token exists and is not expired
        try {
            const verificationTokenHash = crypto.createHash('sha256').update(verificationToken).digest('hex');
            const member = await knex('members').where({ verification_token: verificationTokenHash }).first();
            if (!member) {
                throw new Error('Member not found');
            }

            if (member.verification_token_expires < new Date().toISOString().slice(0, 19).replace('T', ' ')) {
                throw new Error('Verification token expired');
            }

            await knex('members').where({ verification_token: verificationTokenHash }).update({ is_verified: true, verification_token: null, verification_token_expires: null });

            return { message: 'Account verified' };

        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to change password using new password
    static async changePassword(email, password) {
        try {
            // Find the member by email
            const member = await this.findByEmail(email);

            if (!member) {
                throw new Error('Member not found');
            }

            // Generate a salt and hash the new password
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            // Update the member's password
            await knex('members').where({ email }).update({ password: hash });

            // Return a success message
            return { message: 'Password changed successfully' };

        } catch (error) {
            // If an error occurs, throw an error with the message
            throw new Error(error.message);
        }
    }

    // Method to get password using email and username
    static async getPassword(email, username) {
        try {
            // Find the member by email and username
            const member = await knex('members').where({ email, username }).first();

            if (!member) {
                throw new Error('Member not found');
            }

            return member.password;

        } catch (error) {
            // If an error occurs, throw an error with the message
            throw new Error(error.message);
        }
    }
}

// Exporting the User class
module.exports = User;