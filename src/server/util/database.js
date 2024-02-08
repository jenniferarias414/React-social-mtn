// const dotenv = require('dotenv');
// dotenv.config();

// Import dotenv to access environment variables
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// Load environment variables
dotenv.config();

// Retrieve the connection string from environment variables
const CONNECTION_STRING = process.env.CONNECTION_STRING;

// Create a new instance of the Sequelize class
 export const sequelize = new Sequelize(CONNECTION_STRING, {
    // Add additional configuration options 
    dialect: 'postgres'
  }); //IF you were to connect to an external DB (Heroku, AWS, Cockroach Labs, etc.) you would need to include the following. Under your dialectOptions, add an additional property called dialectOptions whose value is an object. That object should contain a property called ssl whose value is also an object (so we’ve got an object in an object in an object). The innermost object should have a rejectUnauthorized property whose value is false. This is required for nearly all external databases.