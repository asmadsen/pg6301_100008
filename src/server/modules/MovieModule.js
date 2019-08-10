import { Router } from 'express'
import { paginate } from '../utils/pagination'

export const MovieModule = Symbol('MovieModule')

export default (movieRepository, ratingRepository) => {
	const router = Router()

	router.get('/movies/', async (req, res) => {
		let {
			perPage = '9',
			page = '1',
			sortBy = 'rating',
			sort = 'desc'
		} = req.query
		page = parseInt(page)
		perPage = parseInt(perPage)
		const genres = req.query.genres?.split(',')
		let movies = movieRepository.getAllMovies()
		if (genres) {
			movies = movies.filter(movie => movie.genres.some(genre => genres.includes(genre)))
		}
		movies = movies.map(ratingRepository.calculateRatingOnMovie.bind(ratingRepository))
		const total = movies.length
		const sortAcending = sort.toLowerCase() === 'asc'
		movies = movies.sort((a, b) => {
			if (a[sortBy] > b[sortBy]) return sortAcending ? 1 : -1
			if (a[sortBy] < b[sortBy]) return sortAcending ? -1 : 1
			return 0
		})

		res.send({
			result: paginate(movies, perPage, page - 1),
			meta: {
				page,
				perPage,
				total
			}
		})
	})

	router.get('/movies/:id', async (req, res) => {
		const movie = movieRepository.getMovieById(parseInt(req.params.id))
		if (movie === null) {
			res.statusCode(404).end()
			return
		}
		res.send(movie)
	})

	return router
}
