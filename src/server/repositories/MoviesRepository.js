export class MoviesRepository {
	db

	reviewsRepository

	constructor(db, reviewsRepository) {
		this.db = db
		this.reviewsRepository = reviewsRepository
	}

	getAllMovies() {
		return this.db.all
	}

	getTotalMovies() {
		return this.db.all.length
	}

	getAllGenres() {
		return Array.from(
			new Set(this.db.all.flatMap(movie => movie.genres))
		)
	}

	getMovieById(id) {
		const movie = this.db.get(parseInt(id))
		if (movie === undefined) {
			return null
		}
		movie.reviews = this.reviewsRepository.findReviewsByMovieId(movie.id)
		movie.rating = movie.reviews.reduce((sum, review) => sum + review.rating, 0) / movie.reviews.length

		return movie
	}
}
