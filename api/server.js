// yarn add express sqlite3 helmet morgan cors knex bcryptjs jsonwebtoken dotenv faker pg
// yarn add nodemon --dev
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const knex = require('knex');
const db = require('./dbConfig.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const server = express();

server.use(helmet());
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

server.get('/', (req, res) => {
	res.send(['Sanity Check']);
});

server.get('/api/dogs', async (req, res) => {
	const dogs = await db('dogs');
	res.status(200).json({ dogs });
});

module.exports = server;
