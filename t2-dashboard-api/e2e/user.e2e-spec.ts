import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('User e2e', () => {
	it('Register - error', async () => {
		const res = await request(application.app).post('/user/register').send({
			email: 'test@gmail.com',
			name: 'test',
			password: '1',
		});

		expect(res.statusCode).toBe(422);
	});

	it('Login - success', async () => {
		const res = await request(application.app).post('/user/login').send({
			email: 'viktor2@gmail.com',
			password: '111',
		});

		expect(res.body.jwt).not.toBeUndefined();
	});

	it('Get by id - success', async () => {
		const login = await request(application.app).post('/user/login').send({
			email: 'viktor2@gmail.com',
			password: '111',
		});
		const res = await request(application.app).get('/user/4').set('Authorization', `Bearer ${login.body.jwt}`);

		expect(res.body.email).toBe('test@gmail.com');
	});

	it('Get by id - error', async () => {
		const res = await request(application.app).get('/user/4').set('Authorization', 'Bearer 1sdad');

		expect(res.statusCode).toBe(401);
	});
});

afterAll(() => {
	application.close();
});
