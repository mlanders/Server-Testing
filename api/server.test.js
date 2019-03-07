const request = require('supertest');

const server = require('./server');

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
			console.log(res.body);
			expect(res.body).toEqual(['Sanity Check']);
		});
	});
});

//http status code
//format of the data
//shape of the response
