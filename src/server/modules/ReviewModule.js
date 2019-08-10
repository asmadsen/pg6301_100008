import { Router } from 'express'
import ApiError from '../../shared/ApiError'

export const ReviewModule = Symbol('ReviewModule')

export default reviewsRepository => {
	const router = Router()

	router.get('/reviews', async (req, res) => {
		if (!req.query.userId) {
			res.status(400).send()
			return
		}

		const reviews = reviewsRepository.getReviewsByUser(parseInt(req.query.userId))
		res.json(reviews)
	})

	router.post('/reviews', async (req, res) => {
		if (!req.user) {
			res.status(401).send()
			return
		}

		try {
			await reviewsRepository.saveReview({ ...req.body, userId: req.user.id })
			res.status(201).send()
		} catch (e) {
			if (e instanceof ApiError) {
				res.status(400).json({
					error: e.toJson()
				})
			}
		}
	})

	return router
}
