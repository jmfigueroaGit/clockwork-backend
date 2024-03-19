const knexImport = require('knex');
const knexConfig = require('../config/knexfile');
const environment = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[environment];
const bcrypt = require('bcryptjs');

const knex = knexImport(connectionConfig);

class User {
    static async create(username, email, role, password) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            await knex('members').insert({ username, password: hash, email, role, });
            return { username, email, role };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // static async authenticate(username, password) {
    //     try {
    //         const member = await knex('members').where({ username }).first();
    //         if (!member) {
    //             throw new Error('Invalid credentials');
    //         }
    //         const valid = await bcrypt.compare(password, member.password);
    //         if (!valid) {
    //             throw new Error('Invalid credentials');
    //         }
    //         return { id: member.id, role: member.role };
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    // static async find(id) {
    //     try {
    //         const member = await knex('members').where({ id }).first();
    //         if (!member) {
    //             throw new Error('Member not found');
    //         }
    //         return { id: member.id, username: member.username, email: member.email, role: member.role };
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    // static async update(id, username, email, role) {
    //     try {
    //         await knex('members').where({ id }).update({ username, email, role });
    //         return { username, email, role };
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    // static async delete(id) {
    //     try {
    //         await knex('members').where({ id }).del();
    //         return { message: 'Member deleted' };
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    // static async all() {
    //     try {
    //         const members = await knex('members').select('id', 'username', 'email', 'role');
    //         return members;
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    // static async count() {
    //     try {
    //         const [{ count }] = await knex('members').count('id');
    //         return count;
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    // static async paginate(page, limit) {
    //     try {
    //         const members = await knex('members').select('id', 'username', 'email', 'role').limit(limit).offset((page - 1) * limit);
    //         return members;
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    // static async search(query) {
    //     try {
    //         const members = await knex('members').where('username', 'like', `%${query}%`).select('id', 'username', 'email', 'role');
    //         return members;
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    // static async roles() {
    //     try {
    //         const roles = await knex('members').distinct('role').select('role');
    //         return roles;
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    // static async findByRole(role) {
    //     try {
    //         const members = await knex('members').where({ role }).select('id', 'username', 'email', 'role');
    //         return members;
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    // static async findByEmail(email) {
    //     try {
    //         const member = await knex('members').where({ email }).first();
    //         if (!member) {
    //             throw new Error('Member not found');
    //         }
    //         return { id: member.id, username: member.username, email: member.email, role: member.role };
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    // static async findByUsername(username) {
    //     try {
    //         const member = await knex('members').where({ username }).first();
    //         if (!member) {
    //             throw new Error('Member not found');
    //         }
    //         return { id: member.id, username: member.username, email: member.email, role: member.role };
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    // static async findByCredentials(username, email) {
    //     try {
    //         const member = await knex('members').where({ username, email }).first();
    //         if (!member) {
    //             throw new Error('Member not found');
    //         }
    //         return { id: member.id, username: member.username, email: member.email, role: member.role };
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    // static async findByUsernameOrEmail(username, email) {
    //     try {
    //         const member = await knex('members').where({ username }).orWhere({ email }).first();
    //         if (!member) {
    //             throw new Error('Member not found');
    //         }
    //         return { id: member.id, username: member.username, email: member.email, role: member.role };
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    // static async findByUsernameOrEmailOrId(username, email, id) {
    //     try {
    //         const member = await knex('members').where({ username }).orWhere({ email }).orWhere({ id }).first();
    //         if (!member) {
    //             throw new Error('Member not found');
    //         }
    //         return { id: member.id, username: member.username, email: member.email, role: member.role };
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    // static async findByRoleAndUsername(role, username) {
    //     try {
    //         const member = await knex('members').where({ role, username }).first();
    //         if (!member) {
    //             throw new Error('Member not found');
    //         }
    //         return { id: member.id, username: member.username, email: member.email, role: member.role };
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

}

module.exports = User;