/*
The main reason for doing this is to manage our environment variables in one place.
For some reason, we may decide to have multiple .env files. For instance, we may decide to have a separate .env for deployment with docker.
We may also have other configuration variables. We would like to manage these variables efficiently that’s why 
we are following this convention.
*/

const dotenv = require('dotenv');

dotenv.config({path: __dirname + '/config.env'});

module.exports = {
  endpoint: process.env.API_URL,
  masterKey: process.env.API_KEY,
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL
};