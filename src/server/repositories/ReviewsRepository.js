import { ReviewSavedTopic } from '../topics'

export class ReviewsRepository {
	constructor(db, usersRepository, subject) {
		this.db = db
		this.usersRepository = usersRepository
		this.subject = subject
	}

	async saveReview(review) {
		const savedReview = await this.db.create(review)
		this.subject.next({
			topic: ReviewSavedTopic,
			data: savedReview
		})
		return savedReview
	}

	findReviewsByMovieId(movieId) {
		const reviews = this.db.all.filter(review => review.movieId === movieId)
		const usersIdToGet = reviews.map(review => review.userId)
		const users = this.usersRepository.getUsersByIds(usersIdToGet)
		return reviews.map(review => ({
			...review,
			user: users.find(user => user.id === review.userId)
		}))
	}

	calculateRatingOnMovie(movie) {
		const movieReviews = this.findReviewsByMovieId(movie.id)
		const rating = movieReviews
			.reduce((sum, review) => sum + review.rating, 0) / movieReviews.length
		return {
			...movie,
			rating
		}
	}

	getReviewsByUser(userId) {
		return this.db.all.filter(review => review.userId === userId)
	}
}
