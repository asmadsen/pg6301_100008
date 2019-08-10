import LandingPage from '../../../src/client/views/LandingPage'
import React from 'react'
import { mount, shallow } from 'enzyme'
import { mockApiContext, nextTick, sleep } from '../utils'
import Chip from '@material-ui/core/Chip'
import { MemoryRouter } from 'react-router'
import MovieCard from '../../../src/client/components/movie/MovieCard'

describe('client/views/LandingPage', () => {
	it('should not show genres or movies before its loaded', () => {
		const wrapper = shallow(<LandingPage setTitle={() => {}} />)

		expect(wrapper.findByTestId('genresContainer').children()).toHaveLength(0)
		expect(wrapper.findByTestId('moviesContainer').children()).toHaveLength(0)
	})

	it('should show genres when fetched', async () => {
		const genres = ['a', 'b', 'c']

		mockApiContext({
			getAllMovieGenres: () => Promise.resolve(genres),
			getAllMovies: () => Promise.resolve({ result: [], meta: { page: 1, totalItems: 5 } })
		})

		const wrapper = mount(<LandingPage setTitle={() => {}} />)

		await nextTick()
		wrapper.update()
		expect(wrapper.findByTestId('genresContainer').find(Chip).map(chip => chip.props().label)).toEqual(genres)

		wrapper.findByTestId('genresContainer').find(Chip).first().simulate('click')
		expect(wrapper.findByTestId('genresContainer').find(Chip).first().props().color).toEqual('primary')
		wrapper.findByTestId('genresContainer').find(Chip).first().simulate('click')
		expect(wrapper.findByTestId('genresContainer').find(Chip).first().props().color).toEqual(undefined)
	})

	it('should show movies when fetched', async () => {
		const genres = ['a', 'b', 'c']
		const movies = [
			{ director: 'Danny Boyle',
				genres: ['Biography', 'Drama'],
				id: 1,
				image:
					'https://m.media-amazon.com/images/M/MV5BMjE0NTA2MTEwOV5BMl5BanBnXkFtZTgwNzg4NzU2NjE@._V1_SX300.jpg',
				plot:
					'Steve Jobs takes us behind the scenes of the digital revolution, to paint a portrait of the man at its epicenter. The story unfolds backstage at three iconic product launches, ending in 1998 with the unveiling of the iMac.',
				released: '2015-10-22T22:00:00.000Z',
				runtime: 122,
				rating: 2,
				title: 'Steve Jobs' },
			{ director: 'Roar Uthaug',
				genres: ['Action', 'Drama', 'Thriller'],
				id: 2,
				image:
					'https://m.media-amazon.com/images/M/MV5BMTg5Mjg0MjgxMl5BMl5BanBnXkFtZTgwNjUzNDg0NzE@._V1_SX300.jpg',
				plot:
					'Although anticipated, no one is really ready when the mountain pass above the scenic, narrow Norwegian fjord Geiranger collapses and creates an 85-meter high violent tsunami. A geologist is one of those caught in the middle of it.',
				released: '2015-08-27T22:00:00.000Z',
				runtime: 105,
				rating: 4,
				title: 'The Wave' }
		]

		mockApiContext({
			getAllMovieGenres: () => Promise.resolve(genres),
			getAllMovies: () => Promise.resolve({ result: movies, meta: { page: 1, totalItems: 5 } })
		})

		const wrapper = mount(<MemoryRouter>
			<LandingPage setTitle={() => {}} />
		</MemoryRouter>)

		await nextTick()
		wrapper.update()
		expect(wrapper.findByTestId('moviesContainer').find(MovieCard).map(card => card.props().movie)).toEqual(movies)
	})
})
