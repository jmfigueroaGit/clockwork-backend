# Backend Server for Web Application

This project is a backend server for a web application. It's built with Node.js, Express, and MySQL. The server handles API requests, interacts with the MySQL database using Knex.js, and provides responses in JSON format.

## Getting Started

These instructions will guide you on how to set up the project on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js - JavaScript runtime environment
- npm - Node Package Manager, comes with Node.js
- MySQL - Relational database management system

### Installation and Setup

Follow these steps to get the project up and running:

1. **Clone the repository:**

   Use the following command to clone the repository to your local machine:

   ```
   git clone https://github.com/jmfigueroaGit/clockwork-backend.git
   ```

2. **Install the dependencies:**

   Navigate into the project directory and install the necessary dependencies:

   ```
   cd clockwork-backend
   npm install
   npm install knex
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and set your environment variables as per the `.env.example` file.

   ```
    DB_HOST_DEV =
    DB_USER_DEV =
    DB_PASS_DEV =
    DB_PORT_DEV =
    DB_NAME_DEV =
    CYPHER_LOGIN_IV =
    CYPHER_SECRET_KEY =
    NODE_ENV = "development"
    SESSION_SECRET=
    JWT_SECRET=

   ```

4. **Run the migrations:**

   Use Knex.js to run the migrations and set up the database schema:

   ```
   knex migrate:latest
   ```

5. **Start the server:**

   Use the following command to start the server:

   ```
   npm start
   ```

## Running the Tests

This section will be updated with information on how to run the automated tests for this system.

## Built With

- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [MySQL](https://www.mysql.com/) - Open-source relational database management system
- [Knex](http://knexjs.org/) - SQL query builder for JavaScript

## Contributing

Contributions are welcome. Please fork the repository and create a pull request with your changes.

## Authors

- **Jheremiah Figueroa** - _Web Developer_ - [YourName](https://github.com/jmfigueroaGit)
