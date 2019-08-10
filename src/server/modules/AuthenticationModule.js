import { Router } from 'express'
import passport from 'passport'
import { isProd } from '../../shared/utils'
import ApiError from '../../shared/ApiError'

export const AuthenticationModule = Symbol('AuthenticationModule')

export default usersRepository => {
	const router = Router()

	router.post('/signup', async (req, res) => {
		try {
			await usersRepository.create(req.body)
			passport.authenticate('local')(req, res, () => {
				req.session.save(err => {
					if (err) {
						res.status(500).send()
						return
					}
					res.status(201).send()
				})
			})
		} catch (e) {
			if (e instanceof ApiError) {
				res.status(400).json({
					error: e.toJson()
				})
			}
		}
	})

	router.post('/login', passport.authenticate('local'), (req, res) => {
		res.status(204).send()
	})

	router.post('/logout', (req, res) => {
		req.logout()
		res.status(204).send()
	})

	router.get('/user', (req, res) => {
		if (!req.user) {
			res.status(401).send()
			return
		}
		const { id, firstName, lastName, dateOfBirth, alias } = req.user
		const user = { id, firstName, lastName, dateOfBirth, alias }
		res.status(200).json({
			results: [
				user
			]
		})
	})

	if (!isProd) {
		router.get('/__check__is__loggedin__', (req, res) => {
			if (!req.user) {
				res.status(401).send()
				return
			}
			res.status(204).send()
		})
	}

	return router
}
