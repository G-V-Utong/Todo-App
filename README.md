# TaskMaster Pro Todo App
TaskMaster Pro is a simple to-do application built with Node.js, Express, and MongoDB. This application allows you to organize your tasks efficiently by providing features to create, manage, and track tasks in three states: pending, completed, and deleted. It also includes user authentication, so you can securely manage your tasks and sort between pending and completed tasks.

## Features
- Create and manage tasks in different states: pending, completed, and deleted.
- User authentication to ensure that users can only access their own tasks.
- Simple and user-friendly UI interface using EJS templates.
- Error handling at both global and local levels.
- Logging with a structured format for tracking application activities.
- Hosted on a web hosting platform for easy access.

## Dependencies
- TaskMaster Pro relies on the following dependencies:
- bcrypt: For secure password hashing.
- body-parser: Middleware for parsing request bodies.
- connect-mongo: Session store for Express to manage user sessions.
- cookie-parser: Middleware for parsing cookies.
- dotenv: For managing environment variables.
- ejs: A template engine for generating HTML markup.
- express: A web application framework for Node.js.
- express-ejs-layouts: Layout support for EJS templates.
- express-session: Middleware for managing user sessions.
- jest: A testing framework for writing tests.
- joi: For data validation and schema definition.
- jsonwebtoken: For user authentication using JSON Web Tokens.
- method-override: Middleware for HTTP method override.
- mongodb-memory-server: In-memory MongoDB server for testing.
- mongoose: An elegant MongoDB object modeling tool.
- nodemon: Development tool for automatically restarting the server.
- winston: A versatile logging library for Node.js.

## Getting Started
1. Clone this repository to your local machine.
   `git clone https://github.com/your-username/taskmaster-pro.git`
2. Install the project dependencies.
   `npm install`
3. Configure your environment variables. Create a `.env` file and add your configuration details, such as database connection settings and secret keys.
4. Start the application.
   `npm start`
   
## Tests
You can run tests using Jest by executing the following command:
`npm test`

## Database
TaskMaster Pro uses MongoDB as its database for efficient data storage and retrieval.

Feel free to use and extend this simple to-do application to suit your needs and preferences. Enjoy staying organized with TaskMaster Pro!
