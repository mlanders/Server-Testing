const knex = require('knex');
const config = require('../knexfile');

const dbEnv = process.env.DB_ENV || 'development';

module.exports = knex(config[dbEnv]);

// npx heroku run knex migrateLlatest -a *app name from heroku*
