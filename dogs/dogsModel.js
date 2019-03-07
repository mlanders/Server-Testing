const db = require('../api/dbConfig');

module.exports = {
	insert,
	update,
	remove,
	getAll,
	findById,
};

async function insert(dog) {
	const [id] = await db('dogs').insert(dog);
	return db('dogs')
		.where({ id })
		.first();
}

async function update(id, changes) {
	return null;
}

function remove(id) {
	return db('dogs')
		.where({ id })
		.del();
}

function getAll() {
	return db('hobbits');
}

function findById(id) {
	return null;
}
