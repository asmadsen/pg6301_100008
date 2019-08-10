import { reviews } from '../../../src/server/db/Reviews'
import * as supertest from 'supertest'
import app from '../../../src/server/app'

describe('server/routes/ReviewModule', () => {
	let agent
	beforeEach(async () => {
		reviews.reset()
		agent = supertest.agent(app)
		await agent.post('/api/login')
			.send({ email: 'post@example.com', password: '123456' })
	})

	it('should be able to post review', async () => {
		let response = await agent.post('/api/reviews')
			.send({
				review: 'lorem ipsum',
				rating: 3,
				movieId: 1
			})

		expect(response.statusCode).toEqual(201)

		await expect(agent.get('/api/movies/1').then(r => r.body.reviews)).resolves
			.toContainEqual(expect.objectContaining({
				movieId: 1,
				rating: 3,
				review: 'lorem ipsum',
				userId: 1
			}))

		response = await agent.post('/api/reviews')
			.send({
				review: 'changed ipsum',
				rating: 5,
				movieId: 1
			})

		expect(response.statusCode).toEqual(201)

		await expect(agent.get('/api/movies/1').then(r => r.body.reviews)).resolves
			.toContainEqual(expect.objectContaining({
				movieId: 1,
				rating: 5,
				review: 'changed ipsum',
				userId: 1
			}))
	})

	it('should return error if rating is out of bounds', async () => {
		let response = await agent.post('/api/reviews')
			.send({
				review: 'lorem ipsum',
				rating: 0,
				movieId: 1
			})

		expect(response.statusCode).toEqual(400)
		expect(response.body.error.message).toEqual('Rating must be between 1 and 5')

		response = await agent.post('/api/reviews')
			.send({
				review: 'changed ipsum',
				rating: 6,
				movieId: 1
			})

		expect(response.statusCode).toEqual(400)
		expect(response.body.error.message).toEqual('Rating must be between 1 and 5')
	})

	it('should return reviews based on userId', async () => {
		const all = [
			{ id: 1, userId: 1 },
			{ id: 2, userId: 2 },
			{ id: 3, userId: 1 },
			{ id: 4, userId: 2 },
		]
		reviews.items = new Map(all.map(r => [r.id, r]))

		await agent.get('/api/reviews').expect(400)

		await agent.get('/api/reviews?userId=1')
			.expect(200, [
				all[0],
				all[2],
			])
	})

	it('should return 401 if tries to save review when not loggedin', async () => {
		await supertest.default(app).post('/api/reviews')
			.expect(401)
	})
})
