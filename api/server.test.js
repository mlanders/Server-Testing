const request = require('supertest');
const server = require('./server');
const db = require('../api/dbConfig');

afterAll(async () => {
	await db('dogs').truncate();
});
describe('server.js', () => {
	test('should set testing enviornment', () => {
		expect(process.env.DB_ENV).toBe('testing');
	});

	describe('GET /', () => {
		// ASYNC
		test('should return status 200', async () => {
			const res = await request(server).get('/');
			expect(res.status).toBe(200);
		});

		test('should return JSON', async () => {
			const res = await request(server).get('/');
			expect(res.type).toBe('application/json');
		});
		test('should return { "Sanity Check" }', async () => {
			const res = await request(server).get('/');
			expect(res.body).toEqual(['Sanity Check']);
		});
	});

	describe('GET /api/dogs', () => {
		test('should return 200', async () => {
			const res = await request(server).get('/api/dogs');
			expect(res.status).toBe(200);
		});
		test('should return JSON', async () => {
			const res = await request(server).get('/api/dogs');
			expect(res.type).toEqual('application/json');
		});
	});
	describe('POST /api/dogs', () => {
		afterEach(async () => {
			await db('dogs').truncate();
		});

		test('should return 201', async () => {
			const name = { name: 'fido' };
			const res = await request(server)
				.post('/api/dogs')
				.send(name);
			expect(res.status).toBe(201);
		});
		test('should return JSON', async () => {
			const name = { name: 'fido' };
			const res = await request(server)
				.post('/api/dogs')
				.send(name);
			expect(res.type).toBe('application/json');
		});
		test.skip('should return "fido"', async () => {
			const damn = { name: 'fido' };
			const result = await request(server)
				.post('/api/dogs')
				.send(damn);

			expect(result.name).toBe('fido');
		});
	});
	describe('DELETE /api/dogs', () => {
		test('response should be 204', async () => {
			const name = { name: 'fido' };
			const res = await request(server)
				.post('/api/dogs')
				.send(name);

			const response = await request(server)
				.del('/api/dogs')
				.send(res.id);
			expect(response.status).toBe(204);
		});
		test('should return JSON', async () => {
			const name = { name: 'fido' };
			const res = await request(server)
				.post('/api/dogs')
				.send(name);

			const response = await request(server)
				.del('/api/dogs')
				.send(res.id);
			expect(res.type).toBe('application/json');
		});
	});
});
