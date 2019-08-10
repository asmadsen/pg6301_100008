import React, { useContext } from 'react'
import axios from 'axios'
import ApiError from '../../shared/ApiError'
axios.defaults.baseURL = `//${document.location.host}/api`

export const ApiContext = React.createContext({})

export const useApiContext = () => useContext(ApiContext)

const handleApiErrors = error => {
	if (error?.response) {
		if (error.response?.data?.error) {
			throw new ApiError(error.response.data.error.message)
		}
		if (error.response.status === 401) {
			throw new ApiError('You\'re are not logged in', { text: 'Login', url: '/login' })
		}
	}
}

export default ({ user, setUser }) => {
	const getUserInfo = async () => {
		try {
			const response = await axios.get('/user')
			setUser(response.data.results[0])
			return response.data.results[0]
		} catch (e) {
			setUser(null)
		}
		return null
	}

	const login = async (email, password) => {
		try {
			await axios.post('/login', { email, password })
			await getUserInfo()
			return true
		} catch (e) {}
		return false
	}

	const logout = async () => {
		try {
			await axios.post('/logout')
		} catch (e) {}
	}

	const signUp = async ({ email, password, firstName, lastName, alias, dateOfBirth }) => {
		try {
			await axios.post('/signup', {
				email, password, firstName, lastName, alias, dateOfBirth
			})
			await getUserInfo()
			return true
		} catch (e) {
			handleApiErrors(e)
		}
		return false
	}

	const getAllMovies = async ({ genres = [], perPage = 9, page = 0, sortBy = 'rating', sort = 'desc' }) => {
		const params = {
			perPage,
			page: page + 1,
			sortBy,
			sort
		}
		if (genres.length > 0) {
			params.genres = genres.join(',')
		}
		const movies = await axios.get('/movies', {
			params
		})
			.then(response => response.data)
		return movies
	}

	const getAllMovieGenres = async () => {
		const genres = await axios.get('/genres')
			.then(response => response.data)
		return genres
	}

	const getMovie = async id => {
		const movie = await axios.get(`/movies/${id}`)
			.then(response => response.data)
		return movie
	}

	const saveReview = async ({ movieId, review, rating }) => {
		try {
			await axios.post('/reviews', {
				movieId,
				rating,
				review
			})
		} catch (e) {
			handleApiErrors(e)
		}
	}

	const getLoggedInUserReviews = async () => {
		try {
			const response = await axios.get('/reviews', { params: { userId: user.id } })
			return response.data
		} catch (e) {
			handleApiErrors(e)
		}
	}

	return {
		isLoggedIn: Boolean(user),
		user,
		getUserInfo,
		login,
		signUp,
		logout,
		getAllMovies,
		getAllMovieGenres,
		getMovie,
		saveReview,
		getLoggedInUserReviews
	}
}
