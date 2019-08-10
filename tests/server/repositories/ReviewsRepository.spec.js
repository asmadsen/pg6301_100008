import { ReviewsRepository } from '../../../src/server/repositories/ReviewsRepository'
import { ReviewSavedTopic } from '../../../src/server/topics'

describe('server/repositories/ReviewRepository', () => {
	it('should send data to entity and pulish result to subject', async () => {
		const createMock = jest.fn().mockResolvedValue('something')
		const subjectMock = jest.fn()
		const repo = new ReviewsRepository({ create: createMock }, null, { next: subjectMock })

		await expect(repo.saveReview('input')).resolves.toEqual('something')
		expect(createMock).toHaveBeenNthCalledWith(1, 'input')
		expect(subjectMock).toHaveBeenNthCalledWith(1, {
			topic: ReviewSavedTopic,
			data: 'something'
		})
	})

	it('should return reviews by movie id and eager load users', async () => {
		const usersMock = jest.fn()
			.mockImplementation(ids => ids.map(id => ({ id })))
		const repo = new ReviewsRepository(
			{ all: [{ movieId: 1, userId: 1 }, { movieId: 1, userId: 2 }, { movieId: 2, userId: 3 }] },
			{ getUsersByIds: usersMock },
			null
		)

		expect(repo.findReviewsByMovieId(1)).toEqual([
			{ movieId: 1, userId: 1, user: { id: 1 } },
			{ movieId: 1, userId: 2, user: { id: 2 } }
		])
	})

	it('should fetch reviews and calculate rating', () => {
		const repo = new ReviewsRepository(null, null, null)
		const spy = jest.spyOn(repo, 'findReviewsByMovieId')

		spy.mockImplementation(id => [{ rating: 3 }, { rating: 1 }])

		expect(repo.calculateRatingOnMovie({ id: 1 })).toEqual({
			id: 1,
			rating: 2
		})
		expect(spy).toHaveBeenNthCalledWith(1, 1)
	})

	it('should get reviews by user', async () => {
		const all = [
			{ id: 1, userId: 1 },
			{ id: 2, userId: 2 },
			{ id: 3, userId: 1 },
			{ id: 4, userId: 2 },
		]
		const repo = new ReviewsRepository({ all }, null, null)

		expect(repo.getReviewsByUser(1)).toEqual([all[0], all[2]])
		expect(repo.getReviewsByUser(2)).toEqual([all[1], all[3]])
	})
})
