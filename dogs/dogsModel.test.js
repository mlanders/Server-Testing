const db = require('../api/dbConfig');
const Dogs = require('./dogsModel');

describe('set of tests', () => {
	afterEach(async () => {
		await db('dogs').truncate();
	});
	test('insert a dog and return the dogs name', async () => {
		const newDog = { name: 'fido' };
		const res = await Dogs.insert(newDog);
		expect(res.name).toBe('fido');
	});
	test('remove a dog', async () => {
		const id = await Dogs.insert({ name: 'fido' });
		const res = await Dogs.remove(id);
		expect(res).toBe(0);
	});
});
