import supertest from 'supertest'
import app from '../../../src/server/app'
import { users } from '../../../src/server/db/Users'

describe('server/routes/AuthenticationModule', () => {
	beforeEach(() => {
		users.reset()
	})

	it('should be able to signup and login', async () => {
		let response = await supertest(app)
			.post('/api/signup')
			.send({
				email: 'ola@nordmann.no',
				password: 'IvarAasen❤️',
				firstName: 'Ola',
				lastName: 'Nordmann',
				dateOfBirth: '17-05-1814',
				location: 'Norge'
			})

		expect(response.statusCode).toEqual(201)

		response = await supertest(app)
			.post('/api/login')
			.send({
				email: 'ola@nordmann.no',
				password: 'IvarAasen❤️'
			})

		expect(response.statusCode).toEqual(204)
	})

	it('should return 400 if cannot create user', async () => {
		const response = await supertest(app)
			.post('/api/signup')
			.send({
				email: 'ola@nordmann.no',
				firstName: 'Ola',
				lastName: 'Nordmann',
				dateOfBirth: '17-05-1814',
				location: 'Norge'
			})

		expect(response.statusCode).toEqual(400)
		expect(response.body.error).toEqual({ message: 'Missing password' })
	})

	it('should be already logged in after signup', async () => {
		const agent = supertest.agent(app)
		await expect(agent.post('/api/signup').send({
			email: 'ola@nordmann.no',
			password: 'IvarAasen❤️',
			firstName: 'Ola',
			lastName: 'Nordmann',
			dateOfBirth: '17-05-1814',
			location: 'Norge'
		})).resolves
			.toHaveProperty('statusCode', 201)

		await expect(agent.get('/api/__check__is__loggedin__').send()).resolves
			.toHaveProperty('statusCode', 204)
	})

	it('should be able to logout', async () => {
		const agent = supertest.agent(app)

		await expect(agent.post('/api/signup').send({
			email: 'ola@nordmann.no',
			password: 'IvarAasen❤️',
			firstName: 'Ola',
			lastName: 'Nordmann',
			dateOfBirth: '17-05-1814',
			location: 'Norge'
		})).resolves
			.toHaveProperty('statusCode', 201)

		await expect(agent.get('/api/__check__is__loggedin__').send()).resolves
			.toHaveProperty('statusCode', 204)

		await expect(agent.post('/api/logout').send()).resolves
			.toHaveProperty('statusCode', 204)

		await expect(agent.get('/api/__check__is__loggedin__').send()).resolves
			.toHaveProperty('statusCode', 401)
	})

	it('should be logged out if user gets deleted', async () => {
		const agent = supertest.agent(app)

		await expect(agent.post('/api/signup').send({
			email: 'ola@nordmann.no',
			password: 'IvarAasen❤️',
			firstName: 'Ola',
			lastName: 'Nordmann',
			dateOfBirth: '17-05-1814',
			location: 'Norge'
		})).resolves
			.toHaveProperty('statusCode', 201)

		await expect(agent.get('/api/__check__is__loggedin__').send()).resolves
			.toHaveProperty('statusCode', 204)

		users.reset()

		await expect(agent.get('/api/__check__is__loggedin__').send()).resolves
			.toHaveProperty('statusCode', 500)
	})

	it('should return 401 if non existing user or wrong input', async () => {
		let response = await supertest(app)
			.post('/api/login')
			.send({
				email: 'ola@nordmann.no',
				password: 'IvarAasen❤️'
			})

		expect(response.statusCode).toEqual(401)
		response = await supertest(app)
			.post('/api/signup')
			.send({
				email: 'ola@nordmann.no',
				password: 'IvarAasen❤️',
				firstName: 'Ola',
				lastName: 'Nordmann',
				dateOfBirth: '17-05-1814',
				location: 'Norge'
			})

		expect(response.statusCode).toEqual(201)

		response = await supertest(app)
			.post('/api/login')
			.send({
				email: 'ola@nordmann.no',
				password: 'IvarAase'
			})

		expect(response.statusCode).toEqual(401)
	})
})
