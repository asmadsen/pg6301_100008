import { Router } from 'express'

export const MovieGenreModule = Symbol('MovieGenreModule')

export default movieRepository => {
	const router = Router()

	router.get('/genres/', async (req, res) => {
		res.send(movieRepository.getAllGenres())
	})

	return router
}
