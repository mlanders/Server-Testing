require('dotenv').config();
const express = require('express');
const db = require('./dbConfig.js');
const Dogs = require('../dogs/dogsModel');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
	res.send(['Sanity Check']);
});

server.get('/api/dogs', async (req, res) => {
	const dogs = await db('dogs');
	res.status(200).json({ dogs });
});

server.post('/api/dogs', async (req, res) => {
	const dogs = await Dogs.insert(req.body);
	res.status(201).json(dogs);
});

server.delete('/api/dogs', async (req, res) => {
	const dogs = await Dogs.remove(req.body);
	res.status(204).json({ dogs });
});

module.exports = server;
